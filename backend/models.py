from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Metric(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    metric_type: str  # 'revenue', 'users', 'conversions', 'growth'
    current_value: float
    previous_value: float
    target_value: float
    period: str  # 'monthly', 'weekly', 'daily'
    date: datetime = Field(default_factory=datetime.utcnow)

class ChartDataPoint(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    chart_type: str  # 'revenue', 'user_growth', 'traffic_sources'
    period: str  # 'Jan', 'Feb', etc. or source name
    value1: Optional[float] = None  # current, users, or traffic count
    value2: Optional[float] = None  # previous, new_users
    color: Optional[str] = None  # for pie chart segments
    date: datetime = Field(default_factory=datetime.utcnow)

class Campaign(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    campaign_name: str
    status: str  # 'Active', 'Paused', 'Completed'
    budget: float
    spent: float
    impressions: int
    clicks: int
    conversions: int
    cpa: float
    roas: float
    start_date: str
    end_date: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Request/Response Models
class MetricsResponse(BaseModel):
    revenue: dict
    users: dict
    conversions: dict
    growth: dict

class ChartDataResponse(BaseModel):
    data: List[dict]

class CampaignListResponse(BaseModel):
    campaigns: List[Campaign]
    total: int
    page: int
    per_page: int

class CampaignSearchRequest(BaseModel):
    search: Optional[str] = None
    status_filter: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    page: int = 1
    per_page: int = 5
    sort_by: Optional[str] = None
    sort_direction: str = 'asc'