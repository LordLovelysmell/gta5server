import spawnNPCs from '@client/events/custom/spawnNPCs'

export default function () {
  mp.events.add('client/spawnNPCs', spawnNPCs)
}
