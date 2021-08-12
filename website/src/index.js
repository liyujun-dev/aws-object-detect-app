const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
}
const api = {
  detect: (key) =>
    fetch(`${API_URL}/detect?key=${key}`, { headers }).then((res) => res.json()),
  upload: () => fetch(`${API_URL}/upload`, { headers }).then((res) => res.json()),
	records: () => fetch(`${API_URL}/records`, { headers }).then((res) => res.json()),
  userinfo: () => fetch(USER_INFO_URL, { headers }).then((res) => res.json())
};

document.addEventListener("alpine:init", () => {
  Alpine.data("utilities", () => ({
    checkFile: (file) => {
      let acceptSize = 1024 * 1024 * 5; // 必须小于5MB
      let acceptTypes = ["image/jpeg", "image/png"]; // 必须为图片类型
      // 文件验证
      let { size, type } = file;
      return size >= acceptSize || !acceptTypes.includes(type);
    },

    uploadPicture: async (file) => {
      try {
        let { uploadUrl, key } = await api.upload();
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
        });
        return key;
      } catch (error) {
        return error;
      }
    },

    getBoundingBoxes: (results) => {
      let boxes = [];
      const cvtNum = (num) => `${(num * 100).toFixed(4)}%`;
      results.forEach((result) => {
        result.Instances.forEach((instance) => {
          let { BoundingBox } = instance;
          boxes.push({
						name: result.Name,
            height: cvtNum(BoundingBox.Height),
            width: cvtNum(BoundingBox.Width),
            top: cvtNum(BoundingBox.Top),
            left: cvtNum(BoundingBox.Left),
          });
        });
      });
      return boxes;
    },

		getConfidences: (results) => {
			return results.map((result) => {
				let { Confidence, Name } = result;
				return {
					percent: `${Confidence.toFixed(2)}%`,
					name: Name
				}
			})
		},

    detectPicture: (key) => api.detect(key),

		getRecords: async () => {
			try {
				let { items } = await api.records();
				return items.map((item) => {
					let { created, results, key } = item;
					return {
						created: created.S,
						key: key.S,
						picUrl: `${PICTURE_URL}/${key.S}`,
						results: JSON.parse(results.S)
					};
				})
			} catch (error) {
				return error;
			}
		},

    getUserInfo: async () => {
      try {
        let { email, username } = await api.userinfo();
        return { email, username };
      } catch(error) {
        console.log(error);
      }
    },

    logout: () => {
      localStorage.clear();
      location.href = LOGOUT_URL;
    }
  }));
});
