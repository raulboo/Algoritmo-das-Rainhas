def runAlgorithm(num):
    queens = [Queen(i+1, 0) for i in range(num)]
    counter = 0

    def defineY(currentIndex, possibleValues):
        for i in possibleValues:
            queens[currentIndex].moveY(i)

            if queens[currentIndex].x == num:
                # print([(q.x, q.y) for q in queens])
                nonlocal counter
                counter += 1


            else:
                nextIndex = currentIndex + 1

                impossibleY = []
                for j in range(nextIndex):
                    # y[k] != y[n]
                    impossibleY.append(queens[j].y)
                    # (x[k] + y[k]) != (x[n] + y[n])
                    impossibleY.append(queens[j].x + queens[j].y - queens[nextIndex].x)
                    # (x[k] - y[k]) != (x[n] - y[n])
                    impossibleY.append(queens[j].y - queens[j].x + queens[nextIndex].x)

                imposYSet = set(impossibleY)
                allYSet = set([i+1 for i in range(num)])
                possibleYSet = allYSet.difference(imposYSet)

                defineY(nextIndex, possibleYSet)

        if currentIndex == 0:
            print("\n" + "Done!" + "\n")


    defineY(0, [i+1 for i in range(num)])

    print("Total answers for {} pieces: {}".format(num, counter) + ("\n"*3))

class Queen():
    def __init__(self, _x, _y):
        self.x = _x
        self.y = _y

    def moveY(self, _newY):
        self.y = _newY

if __name__ == "__main__":
    for i in range(9, 15):
        runAlgorithm(i)
