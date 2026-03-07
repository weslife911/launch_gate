from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Opportunity
from .serializers import OpportunitySerializer

class OpportunityListView(generics.ListAPIView):
    serializer_class = OpportunitySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Opportunity.objects.all().order_by('-date_scraped')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset