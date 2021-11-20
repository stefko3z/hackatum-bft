//
//  FeedCollectionViewCell.swift
//  Tiny Analyst
//
//  Created by Svilen Kirov on 20.11.21.
//

import UIKit
import WebKit

class FeedCollectionViewCell: UICollectionViewCell, WKNavigationDelegate {
    
    @IBOutlet weak var typeLabel: UILabel!
    @IBOutlet weak var view: UIView!
    
    private var webView: WKWebView!
    
    
    func configureWith(_ data: InsightData?) {
        
    }
}
