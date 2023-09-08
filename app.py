from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import card_based
import uvicorn
import os
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
            card_based.high_amount().to_csv(f"{temp_dir}/big_amount_deduction.csv",index=False)
            lstFile.append(f"big_amount_deduction.csv")
        elif num == 2:
            card_based.high_volume_small_amount().to_csv(f"{temp_dir}/high_volume_small_deduction.csv",index=False)
            lstFile.append(f"high_volume_small_deduction.csv")

        elif num == 3:
            card_based.fake_merchant_false_location().to_csv(f"{temp_dir}/fake_merchant_false_location.csv",index=False)
            lstFile.append(f"fake_merchant_false_location.csv")

    return lstFile

if __name__ == '__main__':
    print("I am running")
    uvicorn.run(app, host='0.0.0.0', port='5000')