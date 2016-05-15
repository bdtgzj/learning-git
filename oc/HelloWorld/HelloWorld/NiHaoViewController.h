//
//  NiHaoViewController.h
//  HelloWorld
//
//  Created by yu xiaodong on 3/27/16.
//  Copyright © 2016 yu xiaodong. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NiHaoViewController : UIViewController <UITextFieldDelegate>

@property (copy, nonatomic) NSString *name;

@property (weak, nonatomic) IBOutlet UITextField *textField;
@property (weak, nonatomic) IBOutlet UILabel *label;

- (IBAction)changeGreeting:(id)sender;

@end