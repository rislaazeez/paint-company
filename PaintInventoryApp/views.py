import datetime
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import PaintInventory
from .serializers import PaintInventorySerializer
from django.contrib.auth.models import Group
import jwt
from django.contrib.auth.models import User
import os

SECRET_KEY = str(os.environ.get('SECRET_KEY'))


"""Login view of a user"""
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if user:

            if not user.check_password(password):
                raise AuthenticationFailed("Password Incorrect!")

            payload = {
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
                'iat': datetime.datetime.utcnow()
            }
            """Create an access token and set that in a response cookie"""
            access_token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            response = Response()
            response.set_cookie(key="jwt", value=access_token, httponly=True)
            response.data = {
                'access': access_token,
            }
            return response
        else:
            return JsonResponse({
                'error': 'Invalid credentials',
            }, status=400)


"""Logout view of a user"""
class LogoutView(APIView):
    def post(self, request):
        response = JsonResponse({'message': 'Logout successful'})
        response.delete_cookie('jwt')
        return response


"""View paint color details"""
class ViewPaintInventory(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed('Access token is required.')
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
        except (jwt.ExpiredSignatureError, jwt.DecodeError, KeyError):
            raise AuthenticationFailed('Unauthenticated')

        # Check if user belongs to 'Manager (View Only)', 'Manager (View/Edit)', or 'Painter' groups
        user_groups = Group.objects.filter(user__id=user_id)
        if user_groups.filter(name='Manager(View Only)').exists() or user_groups.filter(
                name='Manager(View/Edit)').exists() or user_groups.filter(name='Painter').exists():
            # Retrieve paint inventory data
            paint_inventory = PaintInventory.objects.all()
            paint_inventory_serializer = PaintInventorySerializer(paint_inventory, many=True)
            return Response(paint_inventory_serializer.data, status=status.HTTP_200_OK)
        else:
            raise AuthenticationFailed('Unauthenticated!')


"""Update paint stock and it's status"""
class UpdatePaintInventory(APIView):
    def post(self, request, pk):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed('Access token is required.')
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
        except (jwt.ExpiredSignatureError, jwt.DecodeError, KeyError):
            raise AuthenticationFailed('Unauthenticated')

        # Check if user belongs to 'Manager (View/Edit)' or 'Painter' groups
        user_groups = Group.objects.filter(user__id=user_id)
        if user_groups.filter(name='Manager(View/Edit)').exists() or user_groups.filter(name='Painter').exists():
            # Retrieve paint inventory object
            try:
                paint_inventory = PaintInventory.objects.get(pk=pk)
            except PaintInventory.DoesNotExist:
                return Response({'error': 'Paint inventory not found'}, status=status.HTTP_404_NOT_FOUND)
            quantity = request.data.get('quantity')
            if quantity >= 30:
                paint_status = "AVAILABLE"
            elif quantity < 30:
                paint_status = "RUNNING LOW"
            else:
                paint_status = "OUT OF STOCK"
            # Update paint inventory fields
            paint_inventory.quantity = quantity
            paint_inventory.status = paint_status
            paint_inventory.save()

            # Return success response
            return Response({'message': 'Paint inventory updated successfully'}, status=status.HTTP_200_OK)
        else:
            raise AuthenticationFailed('Unauthenticated!')


"""User details(Groups and permissions) for admin"""
class UserDetails(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed('Access token is required.')
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
        except (jwt.ExpiredSignatureError, jwt.DecodeError, KeyError):
            raise AuthenticationFailed('Unauthenticated')
        # check if the user is admin
        user_groups = Group.objects.filter(user__id=user_id)
        if user_groups.filter(name='Admin').exists():

            users = User.objects.all()
            if users:
                # Create a dictionary to store user details
                user_details_list = []

                for user in users:
                    user_details_dict = {
                        'username': user.username,
                        'email': user.email,
                        'groups': [],
                        'permissions': {}
                    }

                    # Get groups of the user
                    user_groups = user.groups.all()
                    for group in user_groups:
                        group_details = {
                            'name': group.name,
                            'permissions': list(group.permissions.values_list('name', flat=True))
                            # Get group's permissions
                        }
                        user_details_dict['groups'].append(group_details)

                        # Store permissions specific to each group
                        user_details_dict['permissions'][group.name] = list(
                            group.permissions.values_list('name', flat=True))

                    user_details_list.append(user_details_dict)

                return Response({'users': user_details_list}, status=status.HTTP_200_OK)
            else:
                return Response({'users': []}, status=status.HTTP_200_OK)
        else:
            raise AuthenticationFailed('Unauthenticated!')
