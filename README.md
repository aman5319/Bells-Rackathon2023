# Bells-Rackathon2023

 Our Problem Statement

## Fraud Pattern Generation Challenge:

How can we create realistic, synthetic financial transaction data for the purpose of better understanding, detecting, and preventing fraud patterns and financial crimes in fintech?

## Our Solution

#### Title: Think like a theif.

#### Theme: Security and Privacy

#### Context -

Financial Frauds are prevalent things, everybody has experienced in some small or a big way. Given there are so many financial instruments that brings ease to the life of customer for making day-to-day purchases. Crackers are always lurking for opportunities to benefit from legit customers through different means. In return, we have to make our systems more robust and think like them to be one step ahead of them. One step towards the solution is we have systems that can flag fraudulent transactions, That would be better but as we know flagging them between millions of legit transactions is like finding a needle in a haystack.

#### Our Answer to the problem -

We find ways of synthetically generating fraud transactions, which crackers use, and then make our systems more resistant. we will be leveraging Stastictis and AI specifically Generative AI capabilities to do so.

#### Our Approach -

Just like how Anti-Viruses have signatures of different viruses that are stored in an active database of viruses. Our approach is similar we maintain an active list of fraudulent strategies used by crackers. And use these strategies to flag fraudulent transactions.

We list down a few basic strategies

* In terms of payment amount, huge bulk payments in a short frame of time.
* Transactions of smaller amounts but in higher volume.
* Credit cards are used in a different location than the customer's usual residence.
* Obscure merchant names.
* Fraudsters test the validity of stolen credit card data by making small transactions before attempting larger purchases
* Fraudsters use stolen credit card data to purchase expensive items or gift cards that can be resold for cash. Hence checking the item of purchase.
* Multiple declined transactions followed by a successful one, indicating attempts to guess card details.
* Transactions at merchants that the user rarely frequents, especially high-risk categories like online casinos or adult content.
* Transactions are made using an uncommon browser or operating system for the user from different geolocations.
* Numerous failed login attempts were followed by a successful one, indicating a brute-force attack.
* Transactions originating from known phishing websites or email domains are designed to trick users into revealing sensitive information.

Hence it is very clear from the above examples we will be using

* Rule-Based Approach: Using predefined rules to flag transactions based on known fraudulent strategies can be effective, especially for detecting common and straightforward fraud patterns. Rules can be quickly implemented and updated as new fraud techniques emerge. However, rule-based systems might struggle with detecting more complex and novel fraud scenarios that don't fit predefined patterns.
* Statistical Analysis and ML: Statistical techniques can provide insights into normal transaction behaviors, allowing you to identify deviations from the norm. Machine learning algorithms like clustering, regression, Outlier detection, and anomaly detection can help uncover patterns that might not be obvious through manual rule creation.
* Generative Adversarial Networks (GANs): Will be used to create synthetic data that represents legitimate transactions, allowing the system to learn the difference between normal and abnormal patterns. GANs can be particularly useful for training models in scenarios where there is limited labeled data for fraud.

Final Result -

A single website where all these strategies will be listed with a checkbox, a user can select any number of checkboxes and generate synthetic data.

Constraints -

* Training and fine-tuning GAN can be tricky especially when the problem statement is temporal in nature.
* Creating Evaluation metrics for Testing the model performance.

Post-Hackathon Plan -

The effectiveness of our generating synthetic data will depend on the quality of the strategies stored in our database and the accuracy of the algorithms used to analyze transactions. Regular updates and continuous learning from new fraud patterns will be essential for staying ahead of evolving threats.

## Tech Stack

1. Angular (For Frontend)
2. FastAPI (Python Backend)
3. Numpy
4. Pandas
5. Pytorch

## Features

1. Generate Synthetic Data by selecting different fraud strategies
2. Download the file in zip
   1. Report Generation for Data Analysis of the generated data.
3. Training Conditional GAN (CTGAN) on the generated data to even more robust generating in high numbers.

## Execution

For Fronted

```
cd Bells
ng serve -o
```

For Backend

```
pip install -r requirements.txt # for installing all the packages
python3 app.py
```

Open

Go in any browser open a new tab `localhost:4200`

For Swagger UI `localhost:5000/docs`
