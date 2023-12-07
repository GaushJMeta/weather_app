# Copyright (c) 2023, gauransh juneja and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from pymongo import MongoClient


class WeatherApp(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	def load_from_db(self):
		locations = get_locations_collection()
		d = locations.find_one({"name":self.name})
		super(Document, self).__init__(d)

	def db_update(self):
		pass

	@staticmethod
	def get_list(args):
		locations = get_locations_collection()
		locations_list = []
		
		for location in locations.find():
			locations_list.append({
				**location,
				
				"_id":str(location["_id"])
			})
   		
		
		print(str(locations_list))
  		
    
		return locations_list

	@staticmethod
	def get_count(args):
		pass

	@staticmethod
	def get_stats(args):
		pass

def get_locations_collection():
    client = MongoClient("mongodb+srv://gauransh:gauransh123@cluster0.lcelwmt.mongodb.net/")
    db = client['weather-database']
    locations = db.locations
    return locations
