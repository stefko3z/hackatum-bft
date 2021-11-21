//
//  FeedViewModel.swift
//  Tiny Analyst
//
//  Created by Svilen Kirov on 20.11.21.
//

import Foundation
import TwoWayBondage

class FeedViewModel {
    
//    var objects: [InsightData]? = [InsightData(category: "Weekly", htmlContent: "<h1>Hallelujah, Hallelujah Privet</h1>"), InsightData(category: "Non Weekly", htmlContent: "<h1>Privet</h1>")]
    var objects = Observable<[InsightsResponse]>()
    
    var numberOfCells: Int {
        objects.value?.count ?? 0
    }
    
    func start() {
        InsightsRepository.getInsights { [weak self]
            results in
            guard let results = results else { return }
            self?.objects.value = [results, results, results]
        }
    }
    
    func cellData(at index: Int) -> InsightsResponse? {
        guard index < numberOfCells else {
            print("Index out of bounds, couldn't set up cell.")
            return nil
        }
        return objects.value?[index]
    }
}
