# Pocket Analyst
This project consists of three parts:
1. Flask server for data analysis and insight generation
2. Express server for data stories generated from the insights via Animejs
3. iOS app where the user receives the data stories

## backend-python
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
  
## backend-nodejs

index.js defines an express server that serves two endpoints
- /generate which generates a data story via animejs
- /insights returns it as a html webpage

data-storyboard is the first iteration of the visualization which uses webpack to combine all js, css files into a single html. This is done for an easy integration with iOS, which will query and display the page.

react-storyboards is the second iteration which utilizes react and inline html for a better development experience. Sadly, the webpack bundler is not compatible with react. Therefor this iteration is not yet compatible with the iOS app.

## frontend-ios

Simple mvvm app with three screens. Our goal was to move away from complicated UI and to limit the user's options. No dashboards, only the best insights, streamlined in a Gen Z manner.

All of the screens contain Feeds with data stories for the respective timeframe(daily, weekly, monthly). Each of the stories has a read more button where detailed insights will be displayed.

Currently only the daily feed is implemented.
