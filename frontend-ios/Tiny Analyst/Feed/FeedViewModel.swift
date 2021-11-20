//
//  FeedViewModel.swift
//  Tiny Analyst
//
//  Created by Svilen Kirov on 20.11.21.
//

import Foundation

class FeedViewModel {
    
    var objects: [InsightData]? = [InsightData(category: "Weekly", htmlContent: "<title>Privet</title>"), InsightData(category: "Non Weekly", htmlContent: "<h1>Privet</h1>")]
    
    var numberOfCells: Int {
        objects?.count ?? 0
    }
    
    func cellData(at index: Int) -> InsightData? {
        guard index < numberOfCells else {
            print("Index out of bounds, couldn't set up cell.")
            return nil
        }
        return objects?[index]
    }
}
