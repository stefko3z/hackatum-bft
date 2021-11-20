//
//  InsightsRepository.swift
//  Tiny Analyst
//
//  Created by Svilen Kirov on 20.11.21.
//

import Foundation
import Alamofire

class InsightsRepository {
    
    static func getInsights(completion: @escaping (InsightsResponse?) -> Void) {
        let requestUrl = "https://localhost:8100/start"
        AF.request(requestUrl).responseDecodable(of: InsightsResponse.self) { response in
            guard response.error == nil else {
                print("Error while getting insights: \(response.error!)")
                return
            }
            print(response.value)
            completion(response.value)
        }
    }
}

struct InsightsResponse: Codable {
    
}
