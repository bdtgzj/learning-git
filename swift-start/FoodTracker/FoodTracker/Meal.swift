//
//  Meal.swift
//  FoodTracker
//
//  Created by yu xiaodong on 4/5/16.
//  Copyright © 2016 yu xiaodong. All rights reserved.
//

import UIKit

class Meal: NSObject, NSCoding {
    
    // MARK: Properties
    var name: String
    // Because a meal will always have a name and rating, but might not have a photo, you can make the UIImage an optional.
    var photo: UIImage?
    var rating: Int
    
    // MARK: Types
    struct PropertyKey {
        static let nameKey = "name"
        static let photoKey = "photo"
        static let ratingKey = "rating"
    }
    
    // MARK: Archiving Paths
    static let DocumentsDirectory = NSFileManager().URLsForDirectory(.DocumentDirectory, inDomains: .UserDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.URLByAppendingPathComponent("meals")
    
    // Init
    init?(name: String, photo: UIImage?, rating: Int) {
        self.name = name
        self.photo = photo
        self.rating = rating
        
        //
        super.init()
        
        // Initialization should fail if there is no name or if the rating is negative.
        if name.isEmpty || rating < 0 {
            return nil
        }
    }
    
    // MARK: NSCoding
    // archive
    func encodeWithCoder(aCoder: NSCoder) {
        // encode the value of each property on the Meal class and store them with their corresponding key.
        aCoder.encodeObject(name, forKey: PropertyKey.nameKey)
        aCoder.encodeObject(photo, forKey: PropertyKey.photoKey)
        aCoder.encodeInteger(rating, forKey: PropertyKey.ratingKey)
    }
    
    // unarchive
    required convenience init?(coder aDecoder: NSCoder) {
        let name = aDecoder.decodeObjectForKey(PropertyKey.nameKey) as! String
        let photo = aDecoder.decodeObjectForKey(PropertyKey.photoKey) as? UIImage
        let rating = aDecoder.decodeIntegerForKey(PropertyKey.ratingKey)
        
        // convenience - Must call designated initializer.
        self.init(name: name, photo: photo, rating: rating)
    }
    
}
