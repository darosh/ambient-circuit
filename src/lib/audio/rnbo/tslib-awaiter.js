export function mG(t, e, r, n) {
	return new (r ||= Promise)(function (i, s) {
		function a(t) {
			try {
				u(n.next(t))
			} catch (t) {
				s(t)
			}
		}
		function o(t) {
			try {
				u(n.throw(t))
			} catch (t) {
				s(t)
			}
		}
		function u(t) {
			var e
			if (t.done) {
				i(t.value)
			} else {
				;((e = t.value),
				e instanceof r
					? e
					: new r(function (t) {
							t(e)
						})).then(a, o)
			}
		}
		u((n = n.apply(t, e || [])).next())
	})
}
