//
//  AddToDoItemViewController.m
//  HelloWorld
//
//  Created by yu xiaodong on 6/18/14.
//  Copyright (c) 2014 yu xiaodong. All rights reserved.
//

#import "AddToDoItemViewController.h"

@interface AddToDoItemViewController ()
@property (weak, nonatomic) IBOutlet UITextField *tv;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *btnBar;

@end

@implementation AddToDoItemViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
// 用户点击BarButton后，先执行这个函数，然后再执行go back segue - unWindToDoList
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if (sender != self.btnBar) return;
    
    if (self.tv.text.length <=0) return;
    
    self.todoItem = [[ToDoItem alloc] init];
    self.todoItem.itemName = self.tv.text;
    self.todoItem.completed = NO; // FALSE
    
}


@end
