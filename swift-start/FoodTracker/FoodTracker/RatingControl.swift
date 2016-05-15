//
//  RatingControl.swift
//  FoodTracker
//
//  Created by yu xiaodong on 4/5/16.
//  Copyright © 2016 yu xiaodong. All rights reserved.
//

import UIKit

class RatingControl: UIView {

    /*
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
    }
    */
    
    // MARK: Properties
    var rating = 0 {
        didSet {
            // trigger a layout update every time the rating changes.
            setNeedsLayout()
        }
    }

    var ratingButtons = [UIButton]()
    let spacing = 5
    let starCount = 5
    
    // MARK: Initialization
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        // pic
        let emptyStarImage = UIImage(named: "emptyStar")
        let filledStarImage = UIImage(named: "filledStar")
        
        // Add buttons
        for _ in 0..<starCount {
            let button = UIButton()
            // set image for button
            button.setImage(emptyStarImage, forState: UIControlState.Normal)
            button.setImage(filledStarImage, forState: .Selected)
            // both selected and highlighted
            button.setImage(filledStarImage, forState: [.Highlighted, .Selected])
            button.adjustsImageWhenHighlighted = false
            // button.backgroundColor = UIColor.redColor()
            button.addTarget(self, action: #selector(RatingControl.ratingButtonTapped(_:)), forControlEvents: .TouchDown)
            ratingButtons += [button]
            addSubview(button)
        }
        
    }
    
    // layout buttons, set button frames in layoutSubviews(), you no longer need to set them when you create the buttons.
    override func layoutSubviews() {
        let buttonHeight = Int(frame.size.height)
        var buttonFrame = CGRect(x: 0, y: 0, width: buttonHeight, height: buttonHeight)
        for (index, button) in ratingButtons.enumerate() {
            buttonFrame.origin.x = CGFloat(index * (buttonHeight + spacing))
            button.frame = buttonFrame
        }
        
        updateButtonSelectionStates()
    }
    
    // update the control’s intrinsic content size
    override func intrinsicContentSize() -> CGSize {
        let buttonHeight = Int(frame.size.height)
        let width = (buttonHeight * starCount) + (spacing * (starCount - 1))
        return CGSize(width: width, height: buttonHeight)
    }
    
    // MARK: Button Action
    // Note that because you’re not using Interface Builder, you don’t need to define your action method with the IBAction attribute; you just define the action like any other method.
    func ratingButtonTapped(button: UIButton) {
        // print("Button Pressed")
        rating = ratingButtons.indexOf(button)! + 1
        
        updateButtonSelectionStates()
    }
    
    // update the selection state of the buttons
    func updateButtonSelectionStates() {
        // If the index of a button is less than the rating, that button should be selected.
        for (index ,button) in ratingButtons.enumerate() {
            button.selected = index < rating
        }
    }

}
