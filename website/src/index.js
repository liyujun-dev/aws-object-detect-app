const api = {
  detect: (key) =>
    fetch(`${API_URL}/detect?key=${key}`).then((res) => res.json()),
  upload: () => fetch(`${API_URL}/upload`).then((res) => res.json()),
	records: () => fetch(`${API_URL}/records`).then((res) => res.json()),
};

document.addEventListener("alpine:init", () => {
  Alpine.data("dev", () => ({
    boxes: [
      {
				name: "Person",
        height: "15.8240%",
        width: "5.3001%",
        top: "77.9326%",
        left: "93.7553%",
      },
      {
				name: "Person",
        height: "18.4743%",
        width: "3.2887%",
        top: "74.7350%",
        left: "86.9413%",
      },
      {
				name: "Person",
        height: "8.0785%",
        width: "2.3181%",
        top: "70.5068%",
        left: "45.8882%",
      },
      {
				name: "Person",
        height: "9.1371%",
        width: "2.0307%",
        top: "71.1140%",
        left: "13.2299%",
      },
      {
				name: "Person",
        height: "14.6511%",
        width: "1.5919%",
        top: "78.0257%",
        left: "98.2861%",
      },
      {
				name: "Person",
        height: "8.4928%",
        width: "1.7470%",
        top: "71.2740%",
        left: "32.8080%",
      },
      {
				name: "Person",
        height: "7.5922%",
        width: "1.4052%",
        top: "71.2833%",
        left: "74.9443%",
      },
      {
				name: "Person",
        height: "11.6020%",
        width: "2.3644%",
        top: "70.0219%",
        left: "15.2694%",
      },
      {
				name: "Person",
        height: "6.2698%",
        width: "1.7325%",
        top: "73.6219%",
        left: "69.4097%",
      },
      {
				name: "Person",
        height: "8.6140%",
        width: "1.6384%",
        top: "69.3195%",
        left: "67.0005%",
      },
      {
				name: "Person",
        height: "8.8304%",
        width: "1.4921%",
        top: "68.3473%",
        left: "21.5973%",
      },
      {
				name: "Person",
        height: "7.7083%",
        width: "1.6637%",
        top: "71.4033%",
        left: "72.4478%",
      },
      {
				name: "Person",
        height: "5.0490%",
        width: "1.8818%",
        top: "78.7937%",
        left: "68.8476%",
      },
      {
				name: "Person",
        height: "14.0569%",
        width: "12.8517%",
        top: "77.6173%",
        left: "15.3647%",
      },
      {
				name: "Person",
        height: "14.7048%",
        width: "10.6397%",
        top: "73.3029%",
        left: "53.2094%",
      },
      {
				name: "Person",
        height: "4.0249%",
        width: "2.4132%",
        top: "69.3341%",
        left: "50.4699%",
      },
      {
				name: "Person",
        height: "15.4286%",
        width: "8.8989%",
        top: "64.7087%",
        left: "24.6954%",
      },
    ],
		key: "01ca7f22e04b4228a57736b929ed8af7.jpg",
		confidences: [{name: "Person", percent: "99%"}]
  }));

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
		}
  }));
});
