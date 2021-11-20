//
//  FeedViewController.swift
//  Tiny Analyst
//
//  Created by Svilen Kirov on 20.11.21.
//

import UIKit

class FeedViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    
    private let cellIdentifier = "FeedCollectionViewCell"
    var viewModel = FeedViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        viewModel.start()
        bindEvents()
        // Do any additional setup after loading the view.
    }
    
    func bindEvents() {
        viewModel.objects.bindAndFire { [weak self] _ in
            DispatchQueue.main.async {
                self?.collectionView.reloadData()
            }
        }
    }
}

extension FeedViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return viewModel.numberOfCells
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(
            withReuseIdentifier: cellIdentifier,
            for: indexPath) as? FeedCollectionViewCell
          else {
              print("Couldn't dequeue Cell with id: \(cellIdentifier)")
              return UICollectionViewCell()
          }
        cell.configureWith(viewModel.cellData(at: indexPath.row))
        return cell
    }
}
extension FeedViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView,
                        layout collectionViewLayout: UICollectionViewLayout,
                        sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        let width = Int(collectionView.frame.size.width)
        let height = Int(collectionView.frame.size.height - view.safeAreaInsets.top - view.safeAreaInsets.bottom)
        return CGSize(width: width, height: height)
    }
}
