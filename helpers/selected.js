module.exports = {
    setSelectedItem: (selected, option) => {
        return (selected.toString() === option.toString()) ? 'selected="selected"' : '';
    }
}