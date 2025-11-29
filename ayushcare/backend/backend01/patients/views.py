# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status

# from .models import PatientProfile
# from .serializers import PatientProfileSerializer

# class PatientProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         try:
#             profile = request.user.profile
#             serializer = PatientProfileSerializer(profile)
#             # determine "incomplete" by checking a few key fields
#             is_incomplete = (
#                 not profile.full_name or
#                 not profile.phone or
#                 not profile.address
#             )
#             return Response({"success": True, "incomplete": is_incomplete, "data": serializer.data}, status=200)
#         except PatientProfile.DoesNotExist:
#             # no profile created yet
#             return Response({"success": False, "incomplete": True, "message": "Profile not created"}, status=404)

#     def post(self, request):
#         # ❗ Prevent creating duplicate profile
#         if hasattr(request.user, "profile"):
#             return Response(
#                 {"success": False, "message": "Profile already exists"},
#                 status=400
#             )

#         serializer = PatientProfileSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(
#                 {"success": True, "message": "Profile created"},
#                 status=201
#             )

#         return Response(serializer.errors, status=400)

#     def put(self, request):
#         # update existing profile
#         try:
#             profile = request.user.profile
#         except PatientProfile.DoesNotExist:
#             return Response({"success": False, "message": "Profile not found"}, status=404)

#         serializer = PatientProfileSerializer(profile, data=request.data, partial=True, context={"request": request})
#         if serializer.is_valid():
#             profile = serializer.save()
#             out = PatientProfileSerializer(profile)
#             return Response({"success": True, "message": "Profile updated", "data": out.data}, status=200)
#         return Response({"success": False, "errors": serializer.errors}, status=400)



# patients/views.py
# patients/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import PatientProfile
from .serializers import PatientProfileSerializer


class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = PatientProfile.objects.get(user=request.user)
        except PatientProfile.DoesNotExist:
            return Response(
                {"success": False, "incomplete": True},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PatientProfileSerializer(profile)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )
