# importing all the requried modules 

import pandas as pd
from datetime import date,timedelta


class Bills:
    def init(self,data):
        self.df = pd.DataFrame(data)
        self.df['bill_due_date'] = pd.to_datetime(self.df['bill_due_date'], format='%d/%m/%Y')
        self.df = self.df[self.df["status"]!="paid"]
        self.current_date = date.today()        
        return
    
    # sorting feature 
    def sort_feature(self,feature):
        if feature == "importance_level" or feature == "bill_amount" or feature == "is_recurrent":
            dataframe = self.df.sort_values(by = [feature,"bill_due_date"],ascending=[False,True])
            return dataframe
        
    def alert_for_billPayments(self,remainder_time):
        #using this datetime to get the values of all the bills to be paid
        alert_date = self.current_date + timedelta(days=remainder_time)
        alert_df = self.df[self.df["bill_due_date"] <= alert_date]
        return alert_df
    
    def amount_toPay(self,no_of_months):
        result = []
        for i in range(no_of_months):
            flag_date = self.current_date + pd.DateOffset(months=i)
            # filter the dataframe
            monthly_bills = self.df[(self.df['bill_due_date'].dt.year == flag_date.year) & (self.df['bill_due_date'].dt.month == flag_date.month)]
            # calculate the total amount
            total_amount = monthly_bills['bill_amount'].sum()
            result.append({'Month_Year': flag_date.strftime("%B %Y"), 'Total_Amount': total_amount})
        result_df = pd.DataFrame(result)
        return result_df

    
    

#creating a sample data frame for the testing 
initial_data = {
    "bill_name": ["electicity bill", "water bill", "internet bill"],
    "bill_amount": [1000, 500, 1200],
    "bill_due_date": ["13/2/2024", "15/2/2024", "20/2/2024"],
    "is_recurrent" : [False, True, True],
    "importance_level" : [2, 2, 1],
    "status" : ["paid","unpaid","unpaid"]
}





    
