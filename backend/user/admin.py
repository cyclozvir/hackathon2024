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
        ('Additional Information', {
            'fields': ('occupation', )
        }),
    )


# Register your model with the custom admin class
admin.site.register(Seeker, SeekerAdmin)
