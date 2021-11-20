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
    @IBOutlet var view: WKWebView!
    private var webView: WKWebView!
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        webView = WKWebView()
        webView.navigationDelegate = self
        view = webView
    }
    
    
    func configureWith(_ data: InsightData?) {
        typeLabel.text = data?.category
        view.loadHTMLString(data?.htmlContent ?? "", baseURL: nil)
        
    }
}
