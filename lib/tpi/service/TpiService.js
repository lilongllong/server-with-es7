export default class TpiServcie
{
  async getIndexByTime(time)
  {
    const minutes = time.getHours() * 60 + time.getMinutes();
    const index = this._getIndexByMinutes(minutes);
    return index;
  }

  async getIndexByTimeRange(from, to)
  {
    if (from > to)
    {
      throw new Error(`"from" must be lower or equal "to".`);
    }

    const results = [];
    const fromMin = from.getHours() * 60 + from.getMinutes();
    const toMin = to.getHours() * 60 + to.getMinutes();

    for (let i = fromMin; i <= toMin; i++)
    {
      results.push(await this._getIndexByMinutes(i));
    }

    return results;
  }

  async _getIndexByMinutes(minutes)
  {
     return Math.abs(Math.sin((minutes / 24 / 60) * 3 * Math.PI)) * 7;
  }
}
