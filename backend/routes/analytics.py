from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime, date
from models import MetricsResponse, ChartDataResponse, CampaignListResponse, CampaignSearchRequest
from database import metrics_collection, chart_data_collection, campaigns_collection
import math

router = APIRouter()

@router.get("/metrics", response_model=MetricsResponse)
async def get_metrics():
    """Get key performance metrics"""
    try:
        metrics = await metrics_collection.find({}).to_list(1000)
        
        # Transform metrics into the expected format
        result = {
            "revenue": {},
            "users": {},
            "conversions": {},
            "growth": {}
        }
        
        for metric in metrics:
            metric_type = metric["metric_type"]
            if metric_type in result:
                result[metric_type] = {
                    "current": metric["current_value"],
                    "previous": metric["previous_value"],
                    "target": metric["target_value"],
                    "change": round(((metric["current_value"] - metric["previous_value"]) / metric["previous_value"]) * 100, 1)
                }
        
        return MetricsResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch metrics: {str(e)}")

@router.get("/charts/revenue", response_model=ChartDataResponse)
async def get_revenue_chart():
    """Get revenue trend chart data"""
    try:
        data = await chart_data_collection.find({"chart_type": "revenue"}).to_list(1000)
        
        # Transform to frontend format
        chart_data = []
        for item in data:
            chart_data.append({
                "month": item["period"],
                "current": item["value1"],
                "previous": item["value2"]
            })
        
        return ChartDataResponse(data=chart_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch revenue data: {str(e)}")

@router.get("/charts/user-growth", response_model=ChartDataResponse)
async def get_user_growth_chart():
    """Get user growth chart data"""
    try:
        data = await chart_data_collection.find({"chart_type": "user_growth"}).to_list(1000)
        
        # Transform to frontend format
        chart_data = []
        for item in data:
            chart_data.append({
                "month": item["period"],
                "users": item["value1"],
                "newUsers": item["value2"]
            })
        
        return ChartDataResponse(data=chart_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user growth data: {str(e)}")

@router.get("/charts/traffic-sources", response_model=ChartDataResponse)
async def get_traffic_sources_chart():
    """Get traffic sources pie chart data"""
    try:
        data = await chart_data_collection.find({"chart_type": "traffic_sources"}).to_list(1000)
        
        # Transform to frontend format
        chart_data = []
        for item in data:
            chart_data.append({
                "name": item["period"],
                "value": int(item["value1"]),
                "color": item["color"]
            })
        
        return ChartDataResponse(data=chart_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch traffic sources data: {str(e)}")

@router.post("/campaigns", response_model=CampaignListResponse)
async def get_campaigns(request: CampaignSearchRequest):
    """Get campaigns with search, filter, and pagination"""
    try:
        # Build query
        query = {}
        
        # Search filter
        if request.search:
            query["campaign_name"] = {"$regex": request.search, "$options": "i"}
        
        # Status filter
        if request.status_filter and request.status_filter != "all":
            query["status"] = {"$regex": request.status_filter, "$options": "i"}
        
        # Get total count
        total = await campaigns_collection.count_documents(query)
        
        # Build sort
        sort_direction = 1 if request.sort_direction == 'asc' else -1
        sort_field = request.sort_by if request.sort_by else "created_at"
        
        # Get paginated results
        skip = (request.page - 1) * request.per_page
        campaigns_cursor = campaigns_collection.find(query).sort(sort_field, sort_direction).skip(skip).limit(request.per_page)
        campaigns = await campaigns_cursor.to_list(request.per_page)
        
        # Transform to response format
        campaign_list = []
        for campaign in campaigns:
            campaign_list.append({
                "id": campaign.get("id", str(campaign["_id"])),
                "campaign_name": campaign["campaign_name"],
                "status": campaign["status"],
                "budget": campaign["budget"],
                "spent": campaign["spent"],
                "impressions": campaign["impressions"],
                "clicks": campaign["clicks"],
                "conversions": campaign["conversions"],
                "cpa": campaign["cpa"],
                "roas": campaign["roas"],
                "start_date": campaign["start_date"],
                "end_date": campaign["end_date"],
                "created_at": campaign["created_at"]
            })
        
        return CampaignListResponse(
            campaigns=campaign_list,
            total=total,
            page=request.page,
            per_page=request.per_page
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch campaigns: {str(e)}")

@router.get("/campaigns", response_model=CampaignListResponse)
async def get_campaigns_get(
    search: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None),
    page: int = Query(1),
    per_page: int = Query(5),
    sort_by: Optional[str] = Query(None),
    sort_direction: str = Query('asc')
):
    """GET version of campaigns endpoint for easier frontend integration"""
    request = CampaignSearchRequest(
        search=search,
        status_filter=status_filter,
        page=page,
        per_page=per_page,
        sort_by=sort_by,
        sort_direction=sort_direction
    )
    return await get_campaigns(request)