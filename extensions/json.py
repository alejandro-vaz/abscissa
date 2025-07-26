#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   JSON
#

# JSON -> MODULES
import datetime
import json

# JSON -> CLASS
class namespace:
    # CLASS -> VARIABLES
    data: dict | int | float | str | bool | list | None
    # CLASS -> INIT
    async def init(self, request: Request) -> Self: return self
    def load(self, data: dict | int | float | str | bool | list | None) -> None:
        if isinstance(data, dict):
            for key, value in data.items():
                data[key] = self.convert(value)
        if isinstance(data, list):
            for index in range(len(data)):
                data[index] = self.convert(data[index])
        self.data = data
    def convert(self, value: any) -> dict | int | float | str | bool | list | None:
        match value:
            case datetime.datetime():
                return value.isoformat()
            case bytes():
                return value.hex().upper()
            case _:
                return value
    def tojson(self, *keys: str) -> None:
        for key in keys:
            self.data[key] = json.loads(self.data[key])