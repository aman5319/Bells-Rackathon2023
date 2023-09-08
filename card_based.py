from data import generate_data
import pandas as pd
import random
from tqdm.auto import tqdm
import tempfile

def generate_genuine_data_small_amount(number,):
    a = [generate_data.generate_customer_info()]*number
    b = [(generate_data.generate_merchant_name(false_merchant = False), generate_data.generate_merchant_location(indian = random.choice([True,False])))  for i in range(number)]
    l = []
    d = generate_data.generate_multiple_date_sorted(number,start_date="-30d",end_date = "now")
    for index,_ in enumerate(range(number)):
        l.append((generate_data.generate_transaction_id_approval_code())+
                  (a[index][-1],
        generate_data.generate_transaction_category(), 
        generate_data.generate_transaction_currency(indian=True),
        generate_data.generate_mcc(),
        generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                              huge_amount=False,
                                              whole_number=random.choice([True,False])),
        d[index],
                random.choice(["Credit Card", "Debit Card"]),
                  random.choice(["PIN", "Biometric"]),
                  random.choice(["Purchase", "Transfer", "Payment"])
            )
                )
    
    return pd.concat([
        pd.DataFrame(a, columns=["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]),
        pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
        pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
    ],axis=1
    )
                                                                     
def generate_genuine_data_huge_amount(number,):
    a = [generate_data.generate_customer_info()]*number
    b = [(generate_data.generate_merchant_name(false_merchant = False), generate_data.generate_merchant_location(indian = random.choice([True,False])))  for i in range(number)]
    l = []
    d = generate_data.generate_multiple_date_sorted(number,start_date="-30d",end_date = "now")
    for index,_ in enumerate(range(number)):
        l.append((generate_data.generate_transaction_id_approval_code())+
                  (a[index][-1],
        generate_data.generate_transaction_category(), 
        generate_data.generate_transaction_currency(indian=True),
        generate_data.generate_mcc(),
        generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                              huge_amount=random.choice([True,False]),
                                              whole_number=random.choice([True,False])),
        d[index],
                random.choice(["Credit Card", "Debit Card"]),
                  random.choice(["PIN", "Biometric"]),
                  random.choice(["Purchase", "Transfer", "Payment"])
            )
                )
    
    return pd.concat([
        pd.DataFrame(a, columns=["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]),
        pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
        pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
    ],axis=1
    )

# high amount payment  id-> 1
def high_amount():
    all_data= []
    for i in tqdm(range(generate_data.GENERATE_COUNT)):
        genuine = generate_genuine_data_small_amount(random.randint(1,4))
        genuine["fake"]=False
        number = random.randint(1,2)
        b = [(generate_data.generate_merchant_name(false_merchant = random.choice([True,False])), generate_data.generate_merchant_location(indian = random.choice([True,False])))  for i in range(number)]
        l = []
        if random.choice([True,False]):
            d = generate_data.generate_multiple_date_sorted(number,start_date=genuine.trans_date.iloc[-1],end_date = "now")
        else:
            d =  generate_data.generate_multiple_date_sorted_small_precision(genuine.trans_date.iloc[-1], number)

        for index,_ in enumerate(range(number)):
            l.append((generate_data.generate_transaction_id_approval_code())+
                      (genuine.customer_location.iloc[0],
            generate_data.generate_transaction_category(), 
            generate_data.generate_transaction_currency(indian=random.choice([True,False])),
            generate_data.generate_mcc(),
            generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                                  huge_amount=True,
                                                  whole_number=random.choice([True,False])),
            d[index],
                    random.choice(["Credit Card", "Debit Card"]),
                      random.choice(["PIN", "Biometric"]),
                      random.choice(["Purchase", "Transfer", "Payment"])
                )
                    )
        a = pd.concat([genuine[["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]].iloc[:1,:]]*number).reset_index(drop=True)
        fake =  pd.concat([
            a,
                pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
                pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
        ],axis=1)
        fake["fake"]=True
        all_data.append(pd.concat([genuine,fake]))
    return pd.concat(all_data)

# high_volume small amount  # id -> 2
def high_volume_small_amount():
    all_data= []
    for i in tqdm(range(generate_data.GENERATE_COUNT//2)):
        if random.choice([True,False]):
            genuine = generate_genuine_data_small_amount(random.randint(1,4))
        else:
            genuine = generate_genuine_data_huge_amount(random.randint(1,4))
        genuine["fake"]=False
        number = random.randint(10,20)
        b = [(generate_data.generate_merchant_name(false_merchant = random.choice([True,False])), generate_data.generate_merchant_location(indian = random.choice([True,False])))  for i in range(number)]
        l = []
        d =  generate_data.generate_multiple_date_sorted_small_precision(genuine.trans_date.iloc[-1], number)
        for index,_ in enumerate(range(number)):
            l.append((generate_data.generate_transaction_id_approval_code())+
                      (genuine.customer_location.iloc[0],
            generate_data.generate_transaction_category(), 
            generate_data.generate_transaction_currency(indian=random.choice([True,False])),
            generate_data.generate_mcc(),
            generate_data.generate_transaction_amount(small_amount=True,
                                                  huge_amount=False,
                                                  whole_number=random.choice([True,False])),
            d[index],
                    random.choice(["Credit Card", "Debit Card"]),
                      random.choice(["PIN", "Biometric"]),
                      random.choice(["Purchase", "Transfer", "Payment"])
                )
                    )
        a = pd.concat([genuine[["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]].iloc[:1,:]]*number).reset_index(drop=True)
        fake =  pd.concat([
            a,
                pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
                pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
        ],axis=1)
        fake["fake"]=True
        all_data.append(pd.concat([genuine,fake]))
    return pd.concat(all_data)

#Obscure Merchant/Geo-Location hopping/Phising website/
#id -> 3
def fake_merchant_false_location():
    all_data= []
    for i in tqdm(range(generate_data.GENERATE_COUNT//2)):
        genuine = generate_genuine_data_small_amount(random.randint(1,4))
        genuine["fake"]=False
        number = random.randint(1,2)
        b = [(generate_data.generate_merchant_name(false_merchant = True), generate_data.generate_merchant_location(indian = random.choice([True,False]),
                                                                                                                      existing_location=genuine.customer_location.iloc[0]))
             for i in range(number)]
        l = []
        if random.choice([True,False]):
            d = generate_data.generate_multiple_date_sorted(number,start_date=genuine.trans_date.iloc[-1],end_date = "now")
        else:
            d =  generate_data.generate_multiple_date_sorted_small_precision(genuine.trans_date.iloc[-1], number)

        for index,_ in enumerate(range(number)):
            l.append((generate_data.generate_transaction_id_approval_code())+
                      (generate_data.generate_merchant_location(indian = random.choice([True,False]),existing_location=genuine.customer_location.iloc[0]),
            generate_data.generate_transaction_category(), 
            generate_data.generate_transaction_currency(indian=random.choice([True,False])),
            generate_data.generate_mcc(),
            generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                                  huge_amount=random.choice([True,False]),
                                                  whole_number=random.choice([True,False])),
            d[index],
                    random.choice(["Credit Card"]),
                      random.choice(["PIN", "Biometric"]),
                      random.choice(["Purchase", "Transfer", "Payment"])
                )
                    )
        a = pd.concat([genuine[["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]].iloc[:1,:]]*number).reset_index(drop=True)
        fake =  pd.concat([
            a,
                pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
                pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
        ],axis=1)
        fake["fake"]=True
        all_data.append(pd.concat([genuine,fake]))
    return pd.concat(all_data)

# Multiple Retries and then trasacting into high risk category
def authentication_error():
    all_data= []
    for i in tqdm(range(generate_data.GENERATE_COUNT//2)):
        genuine = generate_genuine_data_small_amount(random.randint(1,4))
        genuine["fake"]=False
        number = random.randint(2,3)
        b = [(random.choice(["Casino SF","PornHub Galtica","Brazzers","Kids RedRoom"]), generate_data.generate_merchant_location(indian = random.choice([True,False]),existing_location=genuine.customer_location.iloc[0]))  for i in range(number*2)]
        l = []
        d =  generate_data.generate_multiple_date_sorted_small_precision(genuine.trans_date.iloc[-1], number*2)

        for index,_ in enumerate(range(number)):
            l.append((generate_data.generate_transaction_id_approval_code())+
                      (generate_data.generate_merchant_location(indian = random.choice([True,False]),existing_location=genuine.customer_location.iloc[0]),
            random.choice(["Entertainment","others"]), 
            generate_data.generate_transaction_currency(indian=random.choice([True,False])),
            generate_data.generate_mcc(),
            generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                                  huge_amount=True,
                                                  whole_number=random.choice([True,False])),
            d[index],
                    random.choice(["Credit Card", "Debit Card"]),
                      random.choice(["PIN", "Biometric"]),
                      random.choice(["authentication_error"])
                )
                    )
        else:
            for index,_ in enumerate(range(number,number*2)):
                l.append((generate_data.generate_transaction_id_approval_code())+
                          (generate_data.generate_merchant_location(indian = random.choice([True,False]),existing_location=genuine.customer_location.iloc[0]),
                random.choice(["Entertainment","others"]), 
                generate_data.generate_transaction_currency(indian=random.choice([True,False])),
                generate_data.generate_mcc(),
                generate_data.generate_transaction_amount(small_amount=random.choice([True,False]),
                                                      huge_amount=True,
                                                      whole_number=random.choice([True,False])),
                d[index],
                        random.choice(["Credit Card", "Debit Card"]),
                          random.choice(["PIN", "Biometric"]),
                          random.choice(["Purchase", "Transfer", "Payment"])
                    )
                        )

        a = pd.concat([genuine[["cardholder_name","card_number","customer_age","customer_segment","card_type","customer_location"]].iloc[:1,:]]*number*2).reset_index(drop=True)
        fake =  pd.concat([
            a,
                pd.DataFrame(b,columns=["merchant_name","merchant_location"]),
                pd.DataFrame(l,columns=["trans_id","trans_approval_code","trans_loc","trans_cat",
                                "trans_currency","mcc","trans_amount","trans_date",
                               "trans_payment_method","trans_verify_method","trans_status"])
        ],axis=1)
        fake["fake"]=True
        all_data.append(pd.concat([genuine,fake]))
    return pd.concat(all_data)

def main():
    temp_dir = "local_data"
    high_amount().to_csv(f"{temp_dir}/big_amount_deduction.csv",index=False)
    high_volume_small_amount().to_csv(f"{temp_dir}/high_volume_small_deduction.csv",index=False)
    fake_merchant_false_location().to_csv(f"{temp_dir}/fake_merchant_false_location.csv",index=False)
    


main()