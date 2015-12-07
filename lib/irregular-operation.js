/**
 * The type of the irregular operation
 * @type {Object}
 */
module.exports = {
  CANCELLATION: 'Flight has been cancelled for any reason.',
  CONTINUATION_OF: 'Identifies a linked flight that this flight is a continuation of. Typically a continuation occurs when a flight is diverted to an alternate destination airport in order to get passengers to their scheduled destination.',
  CONTINUED_BY: 'Identifies a linked flight which will be a continuation of this one. Typically a continuation occurs when a flight is diverted to an alternate destination airport in order to get passengers to their scheduled destination.',
  DIVERSION: 'Flight is directed to land at a different airport than its scheduled destination.',
  FLOWN_OVER: 'A fly-over occurs when a plane flying a route comprised of multiple stops skips one or more of the scheduled stops for some reason. The FLOWN_OVER type indicates that the flight in question is not expected to occur because the plane flying the route will not stop at the departure airport specified.',
  FLYOVER: 'A fly-over occurs when a plane flying a route comprised of multiple stops skips one or more of the scheduled stops for some reason. The FLY_OVER type indicates that the flight in question will not stop at one of the scheduled destinations.',
  MISCELLANEOUS: 'An irregular operation that does not qualify as one of the other identified types listed here.',
  REINSTATEMENT: 'A flight was cancelled for a period of time and subsequently reinstated to operational status.',
  REPLACED_BY: 'Any flight that is cancelled or does not operate for some reason may be replaced by another flight. Provides linking information for the flight that has replaced this one.',
  REPLACEMENT_FOR: 'Identifies this as a flight that replaced some other flight. Provides linking information for the flight that was replaced by this one.',
  RETURN_TO_GATE: 'Flight backed away from the gate and started to taxi, does not take off, and returns to gate.',
  RETURN_FROM_AIRBORNE: 'Flight has taken off and is required to return to its original departure airport.',
}
