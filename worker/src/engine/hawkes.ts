/**
 * HAWKES SELF-EXCITING POINT PROCESS ENGINE
 * Computes temporal attention decay, viral excitement velocity, and half-life windows.
 * 
 * Intensity function:
 *   λ(t) = μ * s(t) + Σ α * exp(-β * (t - t_i))
 */

export interface HawkesPoint {
  timestampSeconds: number; // Unix timestamp in seconds
  weight?: number;          // Optional weight/magnitude of event
}

export interface HawkesDecayResult {
  intensity: number;            // Current intensity λ(t)
  backgroundRate: number;       // Base exogenous rate μ
  viralCascadeRate: number;     // Endogenous self-exciting component
  halfLifeHours: number;        // Half-life t_half in hours
  remainingWindowHours: number; // Estimated hours remaining in Grade-A window
  decayRateBeta: number;        // Beta parameter
  excitationAlpha: number;      // Alpha parameter
  grade: "A+" | "A" | "B" | "C" | "D";
}

/**
 * Calculates current Hawkes process intensity and attention window metrics
 * @param timestamps Array of historical event timestamps in seconds
 * @param nowSeconds Current Unix timestamp in seconds
 * @param mu Base background impulse rate (exogenous)
 * @param alpha Excitation factor per event
 * @param beta Decay rate parameter
 */
export function calculateHawkesDecay(
  timestamps: number[],
  nowSeconds: number = Math.floor(Date.now() / 1000),
  mu: number = 0.05,
  alpha: number = 0.8,
  beta: number = 0.00015 // ~1.28 hour half-life default
): HawkesDecayResult {
  if (!timestamps || timestamps.length === 0) {
    const halfLifeHours = Math.LN2 / (beta * 3600);
    return {
      intensity: mu,
      backgroundRate: mu,
      viralCascadeRate: 0,
      halfLifeHours: Number(halfLifeHours.toFixed(1)),
      remainingWindowHours: 0,
      decayRateBeta: beta,
      excitationAlpha: alpha,
      grade: "D"
    };
  }

  let cascade = 0;
  for (const t of timestamps) {
    const delta = nowSeconds - t;
    if (delta >= 0) {
      cascade += alpha * Math.exp(-beta * delta);
    }
  }

  const intensity = mu + cascade;
  const halfLifeHours = Math.LN2 / (beta * 3600);
  
  // Calculate remaining window: time until intensity drops to 2x background rate
  let remainingWindowHours = 0;
  if (cascade > 0) {
    const targetCascade = Math.max(mu * 0.5, 0.01);
    const timeToTarget = Math.log(cascade / targetCascade) / beta;
    remainingWindowHours = Math.max(0, Number((timeToTarget / 3600).toFixed(1)));
  }

  let grade: "A+" | "A" | "B" | "C" | "D" = "D";
  if (intensity >= 5.0) grade = "A+";
  else if (intensity >= 2.5) grade = "A";
  else if (intensity >= 1.0) grade = "B";
  else if (intensity >= 0.3) grade = "C";

  return {
    intensity: Number(intensity.toFixed(4)),
    backgroundRate: mu,
    viralCascadeRate: Number(cascade.toFixed(4)),
    halfLifeHours: Number(halfLifeHours.toFixed(1)),
    remainingWindowHours,
    decayRateBeta: beta,
    excitationAlpha: alpha,
    grade
  };
}
