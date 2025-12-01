# centers/serializers.py
from rest_framework import serializers
from clinic.models import Center
from django.conf import settings

class CenterSerializer(serializers.ModelSerializer):
    # Add full URL fields for images
    image1_url = serializers.SerializerMethodField()
    image2_url = serializers.SerializerMethodField()
    map_embed_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Center
        fields = [
            "id", "name", "address", "city", "state", "pincode", "contact_number",
            "image1", "image2", "image1_url", "image2_url",
            "map_image_url", "map_embed_url",
            "description", "available_services",
        ]
    
    def get_image1_url(self, obj):
        """Return full URL for image1"""
        if obj.image1:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image1.url)
            # Fallback for when request is not available
            return f"{settings.MEDIA_URL}{obj.image1.url}" if obj.image1.url else None
        return None
    
    def get_image2_url(self, obj):
        """Return full URL for image2"""
        if obj.image2:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image2.url)
            return f"{settings.MEDIA_URL}{obj.image2.url}" if obj.image2.url else None
        return None
    
    def get_map_embed_url(self, obj):
        """Generate Google Maps embed URL for the center"""
        if not obj.name or not obj.city or not obj.state:
            return None
        
        # Build address string
        address = f"{obj.name}, {obj.address or ''}, {obj.city}, {obj.state} {obj.pincode or ''}".strip()
        from urllib.parse import quote_plus
        address_encoded = quote_plus(address)
        
        # Return Google Maps embed URL
        api_key = getattr(settings, 'GOOGLE_MAPS_API_KEY', None)
        if api_key:
            return f"https://www.google.com/maps/embed/v1/place?key={api_key}&q={address_encoded}"
        return None
