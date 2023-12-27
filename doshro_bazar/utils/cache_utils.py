from rest_framework_extensions.key_constructor.constructors import (
    DefaultKeyConstructor
)
from rest_framework_extensions.key_constructor.bits import (
    KeyBitBase,
    RetrieveSqlQueryKeyBit,
    ListSqlQueryKeyBit,
    PaginationKeyBit
)
from rest_framework_extensions.key_constructor import bits
from doshro_bazar.users.models import User

from django.core.cache import cache
from django.utils.encoding import force_str

class ProfileUpdatedAtKeyBit(KeyBitBase):
    
    def get_data(self,request, **kwargs):
        if not request.user.is_authenticated:
            return
        key = f"profile_1"
        print(key)
        value = cache.get(key, None)

        if not value:
            print("here")
            value = User.objects.get(id=request.user.id)
            cache.set(key, value=value)
        return force_str(value)


    
class ProfileKeyConstructor(DefaultKeyConstructor):
    args_bit = bits.ArgsKeyBit()
    kwargs_bit = bits.KwargsKeyBit()

    user_pk = bits.UserKeyBit()
    profile_updated = ProfileUpdatedAtKeyBit()
