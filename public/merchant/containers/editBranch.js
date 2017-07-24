import m from "mithril";
import { branch } from "../models/branches.js";
import { isEmptyObject } from "../../util/utils.js";

var EditBranch = {
	oninit: function(vnode) {
		EditBranch.state.loader = true;
		branch.GetBranch(vnode.attrs.id).then(function() {
			EditBranch.state.loader = false;
		}).catch(function() {
			EditBranch.state.loader = false;
		})
		console.log("oninit callled");
	},
	state: {
		loader: true
	},
	onremove: function() {
		branch.editBranch = {}
	},
	view: function(vnode) {
		return (
			<section class="">
				<div class="ph4 pv4 bg-white shadow-m2 ">
					<div class="">
						<span class="fw6 f3">Edit This Branch </span>
					</div>
				</div>
				<div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
					{!isEmptyObject(branch.editBranch)?
					<div class="">
						<div class="pa2">
							<label class="f4 gray pv2 dib">Address:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.address = value;
								})}
								value={branch.editBranch.address}
							/>
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">City:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.city = value;
								})}
								value={branch.editBranch.city}
							/>
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">State:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.state = value;
								})}
								value={branch.editBranch.state}
							/>
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">Country:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.country = value;
								})}
								value={branch.editBranch.country}
							/>
						</div>
						<h4>Location Area</h4>
						<div class="pa2">
							<label class="f4 gray pv2 dib">Area:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.location.area = value;
								})}
								value={branch.editBranch.area}
							/>
						</div>

						<div class="pa2  pv3 mt2 tr">
							<button
								class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 "
								onclick={function() {
									branch.UpdateBranch();
								}}
							>
								Update Branch
							</button>
						</div>
					</div>:""}
					<div class="tc">
						{EditBranch.state.loader?<div class="loader" style="color: red"></div>:""}
					</div>
				</div>
			</section>
		);
	}
};

export default EditBranch;
