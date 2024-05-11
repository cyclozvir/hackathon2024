from rest_framework import serializers
from .models import MissingPerson, MissingPersonLocation


class MissingPersonLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissingPersonLocation
        fields = ('latitude', 'longitude')


class MissingPersonSerializer(serializers.ModelSerializer):
    last_seen_location = MissingPersonLocationSerializer()

    class Meta:
        model = MissingPerson
        fields = '__all__'

    def create(self, validated_data):
        last_seen_location_data = validated_data.pop('last_seen_location', None)
        missing_person = MissingPerson.objects.create(**validated_data)

        if last_seen_location_data:
            MissingPersonLocation.objects.create(missing_person=missing_person, **last_seen_location_data)

        return missing_person