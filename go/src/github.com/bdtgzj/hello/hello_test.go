package main

import "testing"
import "fmt"

func TestHello(t *testing.T) {
	fmt.Printf("TestHello")

	t.Run("T=1", func(t *testing.T) {
		fmt.Printf("TestHello T=1")
	})
	t.Run("T=2", func(t *testing.T) {
		fmt.Printf("TestHello T=2")
	})

}

func TestHelloParallel(t *testing.T) {
	arr := [5]string{"1", "2", "3", "4", "5"}
	for k, v := range arr {
		t.Run(v, func(t *testing.T) {
			t.Parallel()
			fmt.Printf("k=%d, v=%s\n", k, v)
		})
	}
}
