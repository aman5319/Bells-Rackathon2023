import pandas as pd
import numpy as np
from pathlib import Path
import os
import random
import string
from faker import   Faker
import torch
fake = Faker()
from datetime import datetime
from datetime import timedelta

categorical = {
    "transaction_category": ["Retail", "Grocery", "Dining", "Entertainment", "Utilities", "Travel", "Other"],
   
    "transaction_currency": ["USD", "EUR","JPY", "AUD", "CAD", "Other"],
   
    "card_type": ["Visa", "MasterCard", "American Express", "Rupay", "Other"],
   
    "customer_segment": ["Retail", "Business", "Student", "Premium", "Other"],
   
    "false_merchant":[f"fake_merchant_{i}" for i in range(10)],
   
    "true_merchant":["amazon","airtel","rakuten","zomato","swiggy", "instamart","chai talks","amazon gift cards"],
   
    "indian_city":['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'],
   
    "random_city":['New York City, USA', 'Paris, France', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia', 'Dubai, UAE', 'Rio de Janeiro, Brazil', 'Cape Town, South Africa', 'Toronto, Canada', 'Singapore, Singapore']
}

#In terms of payment amount, huge bulk payments in a short frame of time.
class Data:
    GENERATE_COUNT=1000
    def __init__(self,):
        self.age_range = torch.tensor(list(range(18,70)))
        age_prob = torch.rand(len(self.age_range))
        self.age_prob = age_prob/sum(age_prob)
        
        self.mcc_range = torch.arange(4000,4020)
        mcc_prob = torch.rand(len(self.mcc_range))
        self.mcc_prob = mcc_prob/sum(mcc_prob)
             
    def generate_customer_info(self,):
        cardholder_name  = fake.name()
        card_number = "".join(random.choice(string.digits) for _ in range(12))
        customer_age = self.age_range[torch.multinomial(self.age_prob, 1)].item()
        customer_segment = random.choice(categorical["customer_segment"])
        card_type = random.choice(categorical["card_type"])
        customer_location = random.choice(categorical["indian_city"])
        return cardholder_name, card_number, customer_age, customer_segment,card_type,customer_location
        
    def generate_transaction_id_approval_code(self,):
        return( "".join(random.choice(string.ascii_letters+string.digits) for i in range(18)),
               "".join(random.choice(string.ascii_uppercase+string.digits) for i in range(6)))
               
    
    def generate_merchant_name(self,false_merchant):
        if false_merchant:
            return random.choice(categorical["false_merchant"])
        else:
            return random.choice(categorical["true_merchant"])
            
    def generate_merchant_location(self,indian, existing_location=None):
        if indian:
            l =  random.choice(categorical["indian_city"])
        else:
            l =  random.choice(categorical["random_city"])
        if (existing_location is not None) and (l == existing_location):
            self.generate_merchant_location(indian, existing_location)
        else:
            return l
    
    def generate_transaction_location(self,indian, existing_location=None):
        if indian:
            l =  random.choice(categorical["indian_city"])
        else:
            l =  random.choice(categorical["random_city"])
        if (existing_location is not None) and (l == existing_location):
            self.generate_merchant_location(indian, existing_location)
        else:
            return l

    def generate_transaction_amount(self, small_amount, huge_amount,whole_number):
        # amount 
        if huge_amount:
            if whole_number:
                amount =  torch.randint(5000,50000,(1,))
            else:
                amount =   torch.round(torch.randint(5000,50000,(1,)) +torch.randn(1),decimals=2)
            return amount.item()
        
        if small_amount:
            random_number = torch.rand(1) * 49 + 1
            if whole_number:
                amount =  torch.ceil(random_number)
            else:
                amount =  torch.round(random_number,decimals=2) 

        else:
            if whole_number:
                amount =  torch.randint(100,4000,(1,))
            else:
                amount =   torch.round(torch.randint(100,4000,(1,)) +torch.randn(1),decimals=2)
            
        return amount.item()
    
    def generate_transaction_category(self):
        return random.choice(categorical["transaction_category"])
                
    def generate_transaction_currency(self,indian):
        if indian:
            return "INR"
        else:
            return random.choice(categorical["transaction_currency"])

    def generate_mcc(self,):
        return self.mcc_range[torch.multinomial(self.mcc_prob, 1)].item()
    
    def generate_date_single(self, start_date="-30d",end_date = "now"):
        return fake.date_time_between_dates(start_date,end_date)
    
    def generate_multiple_date_sorted(self, number,start_date="-30d",end_date = "now"):
        return sorted([ self.generate_date_single(start_date,end_date) for i in range(number)])
    
    def generate_multiple_date_sorted_small_precision(self,last_date, number):
        dates = []
        for i in range(number):
            last_date = last_date+ timedelta(seconds = random.randint(20,50))
            dates.append(last_date)
        return dates
    
generate_data = Data()
