package newmath

func Sqrt(x float64) float64 {
    z := 1.0
    for i := 0; i < 1000; i++ {
        z -= (z*z -x) / (2 * z)
    }
    return z
}
