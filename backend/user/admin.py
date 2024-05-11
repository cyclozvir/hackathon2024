from django.contrib import admin
from .models import Seeker, SeekerLocation


# Register your models here.

class LocationInline(admin.StackedInline):
    model = SeekerLocation
    fields = ('latitude', 'longitude',)
    extra = 1

class SeekerAdmin(admin.ModelAdmin):
    inlines = [LocationInline]
    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'email', 'role')
        }),
        # ('Location Information', {
        #     'fields': ('latitude', 'longitude',)  # Include location fields here
        # }),
        ('Additional Information', {
            'fields': ('occupation', )
        }),
    )

    def latitude(self, instance):
        return instance.location.latitude

    def longitude(self, instance):
        return instance.location.longitude

    latitude.short_description = 'Latitude'
    longitude.short_description = 'Longitude'



# Register your model with the custom admin class
admin.site.register(Seeker, SeekerAdmin)
