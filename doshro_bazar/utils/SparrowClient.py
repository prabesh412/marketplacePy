import requests
from django.conf import settings


class MessageHandler:
    phone_number=None
    otp=None
    def __init__(self,phone_number,otp) -> None:
        self.phone_number=phone_number
        self.otp=otp
    def send_otp_via_message(self):  
        url = "http://api.sparrowsms.com/v2/sms/"
        payload = {
            "token": "v2_5weypy4G56k64Wv5fFX9d9KWYRx.u3A9",
            "from": "TheAlert",
            "to": self.phone_number,
            "text": f"Your OTP for Doshro Deal is {self.otp}"
        }
        response = requests.post(url, data=payload)

        return response.json()
        

