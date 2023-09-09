from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import card_based
import uvicorn
import os
import pandas as pd
from ydata_profiling import ProfileReport
import zipfile
import os


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def zippit(folder_path):
    output_zip_filename = f'{folder_path}/output.zip'
    # Create a ZIP file for writing
    with zipfile.ZipFile(output_zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Iterate through all files in the folder
        for foldername, subfolders, filenames in os.walk(folder_path):
            for filename in filenames:
                # Check if the file is a CSV file
                if filename.endswith('.csv'):
                    # Get the full file path
                    file_path = os.path.join(foldername, filename)
                    # Add the CSV file to the ZIP archive
                    zipf.write(file_path, os.path.relpath(file_path, folder_path))
                    os.remove(file_path)

@app.get("/")
def read_root(trainingBatch):
    return {"Hello": "World"}


@app.post("/generateSyntheticData")
def post_root(params: List[int], trainingBatch: str):
    lstFile = list()
    temp_dir = './Bells/src/assets/localData/' + trainingBatch
    os.makedirs(temp_dir, exist_ok=True)
    for num in params:
        if num == 1:
            df = card_based.high_amount()
            df.to_csv(f"{temp_dir}/big_amount_deduction.csv",index=False)
            ProfileReport(df,title="Big Amount Deduction").to_file(f"{temp_dir}/big_amount_deduction.html")
            lstFile.append(f"big_amount_deduction")

        elif num == 2:
            df = card_based.high_volume_small_amount()
            df.to_csv(f"{temp_dir}/high_volume_small_deduction.csv",index=False)
            ProfileReport(df,title="High Volume Small Amount Deduction").to_file(f"{temp_dir}/high_volume_small_deduction.html")
            lstFile.append(f"high_volume_small_deduction")

        elif num == 3:
            df = card_based.fake_merchant_false_location()
            df.to_csv(f"{temp_dir}/fake_merchant_false_location.csv",index=False)
            ProfileReport(df,title="Fake Merchant|Geo-Location change|Phising").to_file(f"{temp_dir}/fake_merchant_false_location.html")
            lstFile.append(f"fake_merchant_false_location")

        elif num == 4:
            df = card_based.multiple_retry()
            df.to_csv(f"{temp_dir}/multiple_retry.csv", index=False)
            ProfileReport(df,title="Multiple Retry|High Risk Category Transaction").to_file(f"{temp_dir}/multiple_retry.html")
            lstFile.append(f"multiple_retry")

        elif num == 5:
            df = card_based.money_laundring()
            df.to_csv(f"{temp_dir}/money_laundering.csv",index=False)
            ProfileReport(df,title="Money Laundering").to_file(f"{temp_dir}/money_laundering.html")
            lstFile.append("money_laundering")
    zippit(temp_dir)
    return lstFile

if __name__ == '__main__':
    print("I am running")
    uvicorn.run(app, host='0.0.0.0', port='5000')