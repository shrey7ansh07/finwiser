import pandas as pd
import numpy as np

class yearly_plan:

    def __init__(self, cash_inflows, cash_outflows, overall_cash_assets, overall_non_cash_assets, assumptions, current_age = 27, number_of_years = 5):
        self.cash_inflows = cash_inflows
        self.cash_outflows = cash_outflows
        self.overall_cash_assets = overall_cash_assets
        self.overall_non_cash_assets = overall_non_cash_assets
        self.assumptions = assumptions
        self.current_age = current_age
        self.number_of_years = number_of_years

        self.overall_cash_assets["savings_for_the_year"] = self.inflows_total() - self.outflows_total()
        self.overall_cash_assets["closing_savings"] = self.overall_cash_assets["opening_savings"] + self.overall_cash_assets["savings_for_the_year"]
        self.cash_inflows["income_from_assets"] = self.overall_non_cash_assets["opening_value_of_assets"] * self.assumptions["cash_flow_return_on_assets"]
        self.overall_non_cash_assets["assets_built_in_the_year"] = self.overall_non_cash_assets["opening_value_of_assets"] * self.assumptions["cash_flow_return_on_assets"]
        self.overall_non_cash_assets["closing_value_of_assets"] = self.overall_non_cash_assets["opening_value_of_assets"] + self.overall_non_cash_assets["assets_built_in_the_year"]

        values_overall = list(self.cash_inflows.values()) + list(self.cash_outflows.values()) + list(self.overall_cash_assets.values()) + list(self.overall_non_cash_assets.values()) + list(self.assumptions.values())
        keys_overall = list(self.cash_inflows.keys()) + list(self.cash_outflows.keys()) + list(self.overall_cash_assets.keys()) + list(self.overall_non_cash_assets.keys()) + list(self.assumptions.keys())

        self.overall_data = pd.DataFrame(values_overall, keys_overall, columns = ['Year 1'])
        return

    def inflows_total(self):
        net_inflow = 0
        for key, value in self.cash_inflows.items():
            net_inflow += value
        return net_inflow

    def outflows_total(self):
        net_outflow = 0
        for key, value in self.cash_outflows.items():
            net_outflow += value
        return net_outflow

    def analyze_current_state(self):
        details = {}

        net_worth = 0

        net_worth = self.inflows_total(self.cash_inflows) - self.outflows_total(self.cash_outflows)
        details['savings'] = net_worth

        return details

    def solve_next_state(self, current_state, inflow_rows= 4, outflows_rows= 4):
        next_state = current_state.copy()

        total_inflow = sum(current_state[:inflow_rows])
        total_outflow = sum(current_state[inflow_rows:inflow_rows+outflows_rows]) - current_state["noise_factor"]

        next_state["salary"] = current_state["salary"]*(1+next_state["salary_increase"])

        next_state["opening_value_of_assets"] = current_state["closing_value_of_assets"]

        next_state["opening_savings"] = current_state["closing_savings"]
        next_state["savings_for_the_year"] = total_inflow - total_outflow
        next_state["closing_savings"] = next_state["opening_savings"] + next_state["savings_for_the_year"]

        next_state["income_from_assets"] = next_state["opening_value_of_assets"] * (next_state["cash_flow_return_on_assets"])
        next_state["yearly_bills"] = next_state["yearly_bills"] * (1 + next_state["inflation"]) 
        next_state["Others"] += next_state["noise_factor"] * (np.random.random()-0.50)

        next_state["assets_built_in_the_year"] = next_state["opening_value_of_assets"] * next_state["cash_flow_return_on_assets"]
        next_state["closing_value_of_assets"] = next_state["opening_value_of_assets"] + next_state["assets_built_in_the_year"]

        return next_state

    def solve(self):
        for i in range(number_of_years-1):
            current_state = self.overall_data.iloc[:,-1]
            next_state = self.solve_next_state(current_state)
            self.overall_data['Year '+str(i+2)] = next_state
        return self.overall_data


'''
Cash Inflows		
	Salary and annual bonus	All salary and bonus  - post tax
	Any other inflow	One time inflows (post tax) that may happen like Joining bonus for a new job, lottery wins etc
	Income from assets	Post tax cash inflows from assets built ( eg - rental income from house owned)
	Loans taken	Cash inflows due to loans ( eg Housing loan, vehicle loan etc)
Total Inflow		Addition of all the above items
		
Cash outflows		
	House running	All household expenses like grocery, water, electricity, servantand small one time purchases below Rs 3000 ( like utensils bought) etc
	House Rent	rent paid for the house
	Clothing	
	Transportation	Bus, Auto, parking, petrol, maintenance of vehicle, insurance for vehicle etc
	Communication	land line, mobile, internet charges
	Education	All expenses on school for kids, books for self, training course for self etc
	Medical	All medical expenses plus medical insurance
	Entertainment	Movies, picnics, eat outs etc
	Holidays	Outstation holidays
	Car / House EMI	EMI's to be paid for loans taken
	Household item purchased	All items bought above Rs 3000 eg- Vehicle, Fridge, TV etc
	Maintenance exp.	maintenance of  real estate, car, Fridhe, TV etc 
	Social contribution	Contribution towards welfare of others
	Other expenses	Any expenses that does not come in any abolve categories
	Loans repaid	Loan repayments (principle)
	Investments made	Investments that will give returns over time like Equity, FD, PF etc
	Special events	Wedding expenses, child birth, medical emergencies etc
Total outflow		Addition of all the above outflow items
		
Overall cash assets		
	Opening savings	Cash at hand as you start this exercise
	Savings for the year	Net inflows minus net outflows for the year
	closing savings	Opening savings plus savings for the year
		
Overall non cash Assets 		
	Opening value of assets	Asset value as you start the exercise
	Assets built in the year	Investments during the year
	Capital appreciation in the year	Estimated  appreciation of your assets
	Closing value of assets	addition of the top three values
Assumptions		
	Inflation	estimated inflation (this is your estimate -you can put your number)
	House rent increase	estimated inflation in rentals
	Cash flow return on assets	estimate of your investment saviness - how well you are able to perform in the investment of your savings
	Capital appreciation on Assets	How well your assets are appreciating - how good are your investments
'''

cash_inflows = {
    "salary":  200000,
    "annual_bonus": 0,
    "other_inflow": 0,
    "income_from_assets": 0,
}

cash_outflows = {
    "yearly_bills":  201000,
    "EMI_loans": 0,
    "noise_factor": 0,
    "Others": 0,

}

overall_cash_assets = {
    "opening_savings": 500000,
    "savings_for_the_year": 0,
    "closing_savings": 0,
}

overall_non_cash_assets = {
    "opening_value_of_assets": 15000,
    "assets_built_in_the_year": 0,
    "closing_value_of_assets": 0,
}

assumptions = {
    "inflation": 0.05,
    "cash_flow_return_on_assets": 0.00,
    "salary_increase": 0.06,   
}

current_age = 27
number_of_years = 5


solver = yearly_plan(cash_inflows, cash_outflows, overall_cash_assets, overall_non_cash_assets, assumptions, current_age = 27, number_of_years = 5)

final = solver.solve()

print(final)