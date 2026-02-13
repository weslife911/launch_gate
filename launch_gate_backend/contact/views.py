from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from decouple import config

class ContactRelayView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        v_name = request.data.get('name')
        v_email = request.data.get('email')
        v_subject = request.data.get('subject')
        v_message = request.data.get('message')

        admin_email = config('ADMIN_EMAIL')
        
        context = {
            'name': v_name,
            'email': v_email,
            'subject': v_subject,
            'message': v_message,
        }

        html_content = render_to_string('emails/admin_notification.html', context)
        text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            subject=f"Portal Inquiry: {v_subject}",
            body=text_content,
            from_email=admin_email,
            to=[admin_email],
            reply_to=[v_email]
        )
        email.attach_alternative(html_content, "text/html")
        
        try:
            email.send()
            return Response({"success": True, "message": "Email relayed to admin"})
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=500)