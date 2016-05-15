//
//  NiHaoViewController.m
//  HelloWorld
//
//  Created by yu xiaodong on 3/27/16.
//  Copyright © 2016 yu xiaodong. All rights reserved.
//

#import "NiHaoViewController.h"

@implementation NiHaoViewController

- (IBAction)changeGreeting:(id)sender {
    self.name= self.textField.text;
    NSString *nameString = self.name;
    if ([nameString length] == 0) {
        nameString = @"World!";
    }
    NSString *greeting = [[NSString alloc] initWithFormat:@"Hello, %@!", nameString];
    self.label.text = greeting;
}

@end