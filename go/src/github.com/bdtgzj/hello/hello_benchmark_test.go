package main

import (
	"fmt"
	"testing"
)

func BenchmarkHello(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fmt.Sprintf("hello")
	}
	b.Run("B=1", func(b *testing.B) {
		fmt.Println("benchmark b=1")
	})
	b.Run("B=2", func(b *testing.B) {
		fmt.Println("benchmark b=2")
	})
}
