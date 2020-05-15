module.exports = {
  process(src, filename, config, options) {
    return `module.exports = () => require(${JSON.stringify(filename.replace(/.+!/, ""))})`
  },
}
