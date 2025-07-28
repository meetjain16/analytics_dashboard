from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
metrics_collection = db.metrics
chart_data_collection = db.chart_data
campaigns_collection = db.campaigns

async def initialize_database():
    """Initialize database with sample analytics data"""
    
    # Clear existing data
    await metrics_collection.delete_many({})
    await chart_data_collection.delete_many({})
    await campaigns_collection.delete_many({})
    
    # Initialize metrics data
    metrics_data = [
        {
            "metric_type": "revenue",
            "current_value": 142850.0,
            "previous_value": 124300.0,
            "target_value": 150000.0,
            "period": "monthly",
            "date": datetime.utcnow()
        },
        {
            "metric_type": "users",
            "current_value": 12847.0,
            "previous_value": 11203.0,
            "target_value": 15000.0,
            "period": "monthly",
            "date": datetime.utcnow()
        },
        {
            "metric_type": "conversions",
            "current_value": 2.4,
            "previous_value": 2.1,
            "target_value": 3.0,
            "period": "monthly",
            "date": datetime.utcnow()
        },
        {
            "metric_type": "growth",
            "current_value": 18.7,
            "previous_value": 12.4,
            "target_value": 20.0,
            "period": "monthly",
            "date": datetime.utcnow()
        }
    ]
    
    await metrics_collection.insert_many(metrics_data)
    
    # Initialize revenue chart data
    revenue_data = [
        {"chart_type": "revenue", "period": "Jan", "value1": 82000, "value2": 65000},
        {"chart_type": "revenue", "period": "Feb", "value1": 89000, "value2": 70000},
        {"chart_type": "revenue", "period": "Mar", "value1": 95000, "value2": 75000},
        {"chart_type": "revenue", "period": "Apr", "value1": 105000, "value2": 85000},
        {"chart_type": "revenue", "period": "May", "value1": 118000, "value2": 95000},
        {"chart_type": "revenue", "period": "Jun", "value1": 125000, "value2": 105000},
        {"chart_type": "revenue", "period": "Jul", "value1": 142850, "value2": 124300}
    ]
    
    # Initialize user growth chart data
    user_growth_data = [
        {"chart_type": "user_growth", "period": "Jan", "value1": 8500, "value2": 1200},
        {"chart_type": "user_growth", "period": "Feb", "value1": 9200, "value2": 1350},
        {"chart_type": "user_growth", "period": "Mar", "value1": 9800, "value2": 1100},
        {"chart_type": "user_growth", "period": "Apr", "value1": 10600, "value2": 1400},
        {"chart_type": "user_growth", "period": "May", "value1": 11400, "value2": 1250},
        {"chart_type": "user_growth", "period": "Jun", "value1": 12100, "value2": 1380},
        {"chart_type": "user_growth", "period": "Jul", "value1": 12847, "value2": 1520}
    ]
    
    # Initialize traffic sources data
    traffic_sources_data = [
        {"chart_type": "traffic_sources", "period": "Organic Search", "value1": 4847, "color": "#8b5cf6"},
        {"chart_type": "traffic_sources", "period": "Social Media", "value1": 3421, "color": "#06b6d4"},
        {"chart_type": "traffic_sources", "period": "Direct Traffic", "value1": 2154, "color": "#10b981"},
        {"chart_type": "traffic_sources", "period": "Paid Ads", "value1": 1876, "color": "#f59e0b"},
        {"chart_type": "traffic_sources", "period": "Email", "value1": 549, "color": "#ef4444"}
    ]
    
    chart_data = revenue_data + user_growth_data + traffic_sources_data
    await chart_data_collection.insert_many(chart_data)
    
    # Initialize campaigns data
    campaigns_data = [
        {
            "campaign_name": "Summer Sale Campaign",
            "status": "Active",
            "budget": 15000.0,
            "spent": 12450.0,
            "impressions": 245000,
            "clicks": 12250,
            "conversions": 294,
            "cpa": 42.35,
            "roas": 3.2,
            "start_date": "2024-06-01",
            "end_date": "2024-07-31",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Brand Awareness Push",
            "status": "Active",
            "budget": 8000.0,
            "spent": 6750.0,
            "impressions": 180000,
            "clicks": 7200,
            "conversions": 216,
            "cpa": 31.25,
            "roas": 2.8,
            "start_date": "2024-06-15",
            "end_date": "2024-08-15",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Product Launch Blitz",
            "status": "Completed",
            "budget": 25000.0,
            "spent": 24800.0,
            "impressions": 320000,
            "clicks": 19200,
            "conversions": 576,
            "cpa": 43.06,
            "roas": 4.1,
            "start_date": "2024-05-01",
            "end_date": "2024-06-30",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Holiday Special Prep",
            "status": "Paused",
            "budget": 5000.0,
            "spent": 2100.0,
            "impressions": 95000,
            "clicks": 3800,
            "conversions": 114,
            "cpa": 18.42,
            "roas": 2.1,
            "start_date": "2024-07-01",
            "end_date": "2024-09-01",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Retargeting Excellence",
            "status": "Active",
            "budget": 12000.0,
            "spent": 9200.0,
            "impressions": 150000,
            "clicks": 9000,
            "conversions": 360,
            "cpa": 25.56,
            "roas": 3.8,
            "start_date": "2024-06-01",
            "end_date": "2024-08-31",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Mobile App Install",
            "status": "Active",
            "budget": 18000.0,
            "spent": 14200.0,
            "impressions": 410000,
            "clicks": 16400,
            "conversions": 492,
            "cpa": 28.86,
            "roas": 3.1,
            "start_date": "2024-05-15",
            "end_date": "2024-08-15",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Video Content Boost",
            "status": "Completed",
            "budget": 7500.0,
            "spent": 7350.0,
            "impressions": 125000,
            "clicks": 6250,
            "conversions": 188,
            "cpa": 39.10,
            "roas": 2.4,
            "start_date": "2024-04-01",
            "end_date": "2024-05-31",
            "created_at": datetime.utcnow()
        },
        {
            "campaign_name": "Local Business Drive",
            "status": "Active",
            "budget": 6000.0,
            "spent": 4850.0,
            "impressions": 89000,
            "clicks": 4450,
            "conversions": 133,
            "cpa": 36.47,
            "roas": 2.9,
            "start_date": "2024-06-20",
            "end_date": "2024-08-20",
            "created_at": datetime.utcnow()
        }
    ]
    
    await campaigns_collection.insert_many(campaigns_data)
    
    print("✅ Database initialized with analytics data")