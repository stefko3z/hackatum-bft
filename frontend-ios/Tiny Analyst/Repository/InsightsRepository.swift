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
//        let requestUrl = "http://localhost:8100/start?timestamp=1494430123&type=monthly"
        let requestUrl = "http://localhost:3000/insight"
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

struct InsightsResponse {
    var html: String
}

extension InsightsResponse: Decodable {
//    init(from decoder: Decoder) throws {
//        var string = try decoder.singleValueContainer().decode(String.self)
//        string = String(string.drop(while: { $0 != "<" }).dropLast(2))
//        self.html = string
//    }
}
