from rest_framework import serializers
from .models import MissingPerson, MissingPersonLocation


class MissingPersonLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissingPersonLocation
        fields = ['latitude', 'longitude']


class MissingPersonSerializer(serializers.ModelSerializer):
    last_seen_location = MissingPersonLocationSerializer(many=True, required=False)

    class Meta:
        model = MissingPerson
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        last_seen_location_data = validated_data.pop('last_seen_location', None)
        missing_person = MissingPerson.objects.create(**validated_data)
        if last_seen_location_data:
            for location_data in last_seen_location_data:
                location = MissingPersonLocation.objects.create(**location_data)
                missing_person.last_seen_location.add(location)

        return missing_person

    def update(self, instance, validated_data):
        last_seen_location_data = validated_data.pop('last_seen_location', None)
        instance = super().update(instance, validated_data)
        if last_seen_location_data:
            for location_data in last_seen_location_data:
                location = MissingPersonLocation.objects.create(**location_data)
                instance.last_seen_location.add(location)

        return instance