from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }

    def validate(self, data):
        """
        Check that the two password entries match.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        """
        Create a new user with the validated data.
        """
        validated_data.pop('password2')  # Remove password2 as it's not needed
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = User.objects.filter(username=username).first()
            if user and user.check_password(password):
                attrs['user'] = user
                return attrs
            else:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")
