# hackatum-bft




# backend-python
Contains different endpoints, made available to the Swift User Interface. The Data-Set files have to be added manually in this folder to run the projects.
 
   revenue-endpoint.py :
       - Gather revenue data for a given period of time.
       - Compares results with a previous period(of the same length)
       - Calculates : revenue_per_product, revenue_per_product_previous_period, revenue_per_shop, revenue_per_shop_previous_period, revenue_total, revenue_total_previous_period, percent_Of_now_vs_previous
       - Generates requests for the Visualizer
       - Returns visualised objects to the User Interface
  
   forcasting-endpoint.py:
       - Gather weekly data on the amount of products sold for that period.
       - Creates graphs for the whole time frame of the data (156) weeks
       - Finds local Minimums and Maximums with the goal of identifying trends to predict future demand.
  
   Bag-Problem.py #not yet implemented
       - Use the physical size of products (Volume) together with revenue per item and amount sold of each.
       - Model the famous NP-Problem of filling out a Warehouse (e.g 50 m^2) with weighted items.
       - Approximate an optimal solution for how to fill out the warehouse. 
 
   LinearProgram-optimization.py:  #not yet implemented
       - Divide revenue by # items sold = profit per product
       Idea: Maximizing potential profits using Linear Optimisation system with constraints.
       (How much x1...xn do I supply ...)
  
   promotions_performance.py #not yet implemented
       - Track how effective promotions are.
       - Are people buying item X only when its price is reduced?
       - Are the discounts increasing the sales?
       - Which items are underperforming lately and would benefit from a promotion. (e.g items in off-seasons)
 
 
   And many other ideas that never made it.  
  
   
