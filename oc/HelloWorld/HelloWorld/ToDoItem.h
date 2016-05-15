//
//  ToDoItem.h
//  HelloWorld
//
//  Created by yu xiaodong on 6/18/14.
//  Copyright (c) 2014 yu xiaodong. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ToDoItem : NSObject

@property NSString *itemName;
@property BOOL completed;
@property (readonly) NSDate *createdDate;

@end
