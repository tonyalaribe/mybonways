import m from "mithril";

var Footer = {
	oncreate: function() {},
	// Loggedin: false,
	view: vnode => {
		return (
			<section class="bg-dark-gray  cf f5">
				<div class="tc pv3 white-80 bg-black">
					<span>Copyright {new Date().getFullYear()} MyBonWays</span>
				</div>
			</section>
		);
	}
};

export default Footer;
