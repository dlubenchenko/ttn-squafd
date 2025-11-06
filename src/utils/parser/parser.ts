import type { ParserMap } from "../../types"

export const parser: ParserMap = {
    "ai-parser": null,
    gloryholiday: (value: string): string => {
        let gloryAll = value.trim().split(/\n/gi)
        // console.log(gloryAll)
        // console.log((gloryAll[0].match(/ /g) || []).length)
        if ((gloryAll[0].match(/ /g) || []).length === 5) {
            // console.log(gloryAll, '5');
            let gloryParse = ''

            for (let i = 0; i < gloryAll.length; i++) {
                const el = gloryAll[i].split(' ')
                // console.log(el)
                if (!el[1].toString().includes('-')) {
                    const a = new Date(el[4]).toString().split(' ')
                    const b = new Date(el[5]).toString().split(' ')
                    try {
                        gloryParse += `${el[0]} ${a[2]}${a[1].toUpperCase()}${a[3].slice(
                            -2
                        )} ${el[1]}${el[2]} ${a[4].split(':').join('').slice(0, 4)} ${b[4]
                            .split(':')
                            .join('')
                            .slice(0, 4)} ${b[2]}${b[1].toUpperCase()}${b[3].slice(-2)}\n`
                        // console.log(gloryParse)
                    } catch (e) {
                        return 'Некоректний вибір опції або неповний/некоректний рядок\n'
                    }
                } else {
                    const c = new Date(el[2]).toString().toUpperCase().split(' ')
                    const d = new Date(el[4]).toString().toUpperCase().split(' ')
                    try {
                        gloryParse += `${el[0]} ${c[2]}${c[1]}${c[3].slice(
                            -2
                        )} ${el[1].replace('-', '')} ${el[3].replace(
                            ':',
                            ''
                        )} ${el[5].replace(':', '')} ${d[2]}${d[1]}${d[3].slice(-2)}\n`
                        // console.log(gloryParse)
                    } catch (e) {
                        return 'Некоректний вибір опції або неповний/некоректний рядок\n'
                    }
                }
            }
            // console.log(gloryParse)
            return gloryParse
        } else {
            // console.log(gloryAll, '2');
            let gloryParse = ''

            let gloryAllSplitted = gloryAll.map((el) => el.split(''))

            // console.log(gloryAllSplitted);

            gloryAllSplitted.map((el) => el.splice(el.indexOf('-') - 3, 0, ' '))
            gloryAllSplitted.map((el) => el.splice(el.indexOf('-') + 4, 0, ' '))
            gloryAllSplitted.map((el) => el.splice(el.indexOf(':') + 3, 0, ' '))

            const gloryAllEdited = gloryAllSplitted.map((el) => el.join(''))

            // console.log(gloryAllEdited);

            for (let i = 0; i < gloryAllEdited.length; i++) {
                const el = gloryAllEdited[i].split(' ')
                // console.log(el)
                if (!el[1].toString().includes('-')) {
                    const a = new Date(el[4]).toString().split(' ')
                    const b = new Date(el[5]).toString().split(' ')
                    try {
                        gloryParse += `${el[0]} ${a[2]}${a[1].toUpperCase()}${a[3].slice(
                            -2
                        )} ${el[1]}${el[2]} ${a[4].split(':').join('').slice(0, 4)} ${b[4]
                            .split(':')
                            .join('')
                            .slice(0, 4)} ${b[2]}${b[1].toUpperCase()}${b[3].slice(-2)}\n`
                        // console.log(gloryParse)
                    } catch (e) {
                        return 'Некоректний вибір опції або неповний/некоректний рядок\n'
                    }
                } else {
                    const c = new Date(el[2]).toString().toUpperCase().split(' ')
                    const d = new Date(el[4]).toString().toUpperCase().split(' ')
                    try {
                        gloryParse += `${el[0]} ${c[2]}${c[1]}${c[3].slice(
                            -2
                        )} ${el[1].replace('-', '')} ${el[3].replace(
                            ':',
                            ''
                        )} ${el[5].replace(':', '')} ${d[2]}${d[1]}${d[3].slice(-2)}\n`
                        // console.log(gloryParse)
                    } catch (e) {
                        return 'Некоректний вибір опції або неповний/некоректний рядок\n'
                    }
                }
            }
            // console.log(gloryParse)
            return gloryParse
        }
    },
    kiwi: (value: string): string => {
        const a = value.split(/' '|\n/g)
        const reg = /^[A-Z\d]{2,3}\s\d{3,4}$/
        const flight = a.filter((e) => reg.test(e))
        const monthNames: Array<string> = [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
        ]

        const result = a.reduce(
            (acc, curr): string[][] => {
                if (curr.toString() === flight.toString()) {
                    acc.push([])
                } else {
                    acc[acc.length - 1].push(curr)
                }
                return acc
            },
            [[]]
        )
        // console.log(result)

        const b = (...a: string[][]) => {
            const time = a.map((el) =>
                el.filter((e) => e.includes(':')).map((e) => e.replace(':', ''))
            )
            const date = a.map((el) => el.filter((e) => e.includes('/')))
            const airport = a.map((el) =>
                el.filter((e) => e.includes('·')).map((e) => e.slice(-3))
            )
            return {
                time: [time[0][0], time[1][0]],
                date: [
                    `${date[0][0].slice(-5, -3)}${monthNames[+date[0][0].slice(-2) - 1]}`,
                    `${date[1][0].slice(-5, -3)}${monthNames[+date[1][0].slice(-2) - 1]}`,
                ],
                airport: [airport[0][0], airport[1][0]],
                flight,
                string: `${flight} ${date[0][0].slice(-5, -3)}${monthNames[+date[0][0].slice(-2) - 1]
                    } ${airport[0][0]}${airport[1][0]} ${time[0][0]} ${time[1][0]
                    } ${date[1][0].slice(-5, -3)}${monthNames[+date[1][0].slice(-2) - 1]}`,
            }
        }

        return b(result[0], result[1]).string
    },

    docs: (value: string): string => {
        let amadeus,
            sabre,
            foid,
            contacts,
            totalString = ''
        const value1 = value.split('[+]').map((el) => {
            return el
                .split('\n')
                .map((e) => e.trim())
                .map((e) => e.split('\t'))
                .filter((e) => e.toString() !== '')
        })
        console.log(value1)
        try {
            foid = value1[1]
                .filter((el) => el.length <= 10)
                .map((e) => {
                    return `3FOID/PP${e[6].slice(-3, -1)}${e[7] ? e[7] : `#passport`}-`
                })
                .join('\n')
            console.log(foid)
            amadeus = value1[1]
                .filter((el) => el.length <= 10)
                .map((e) => {
                    let birthday = new Date(e[4].split('-').reverse().join(','))
                        .toDateString()
                        .split(' ')
                    // console.log(birthday)
                    let documentValidity = new Date(e[8].split('-').reverse().join(','))
                        .toDateString()
                        .split(' ')
                    // console.log(documentValidity)

                    return `SR DOCS YY HK1-P-${e[6].slice(-3, -1)}-${e[7] ? e[7] : `#passport`
                        }-${e[6].slice(-3, -1)}-${birthday[2]
                        }${birthday[1].toUpperCase()}${birthday[3].slice(-2)}-F-${documentValidity[2]
                        }${documentValidity[1].toUpperCase()}${documentValidity[3].slice(
                            -2
                        )}-${e[1]}-${e[2]}/P`
                })
                .join('\n')
            console.log(amadeus)

            sabre = value1[1]
                .filter((el) => el.length <= 10)
                .map((e) => {
                    let birthday = new Date(e[4].split('-').reverse().join(','))
                        .toDateString()
                        .split(' ')
                    // console.log(birthday)
                    let documentValidity = new Date(e[8].split('-').reverse().join(','))
                        .toDateString()
                        .split(' ')
                    // console.log(documentValidity)
                    return `3DOCS/P/${e[6].slice(-3, -1)}/${e[7] ? e[7] : `#passport`
                        }/${e[6].slice(-3, -1)}/${birthday[2]
                        }${birthday[1].toUpperCase()}${birthday[3].slice(-2)}/F/${documentValidity[2]
                        }${documentValidity[1].toUpperCase()}${documentValidity[3].slice(
                            -2
                        )}/${e[1]}/${e[2]}-`
                })
                .join('\n')
            contacts = `Amadeus:\nSR CTCE YY - ${value1[0][1][1]
                .toUpperCase()
                .replace('@', '//')}\nSR CTCM YY - ${value1[0][1][2]
                }\nSabre:\n3CTCE/${value1[0][1][1]
                    .toUpperCase()
                    .replace('@', '//')}-\n3CTCM/${value[0][1][2]}-`
        } catch (error) {
            return 'Некоректний вибір опції або неповний/некоректний рядок\n'
        }

        console.log(sabre)
        totalString += `Amadeus:\n${amadeus}\nSabre:\n${sabre}\nContacts:\n${contacts}\nFOID:\n${foid}\n`
        return totalString
    },
    pkfare: (value: string): string => {
        const temp = value.replace(/\n|\t/g, ' ').split(' ')
        for (let i = 1; i < temp.length; i++) {
            if (temp[i] === '+1') {
                temp[i - 1] += '+1' // Модифікувати попередній елемент, додаючи до нього "+1"
                temp.splice(i, 1) // Видалити поточний елемент з масиву
            }
        }
        // console.log(temp);
        const temp1 = temp.filter((el) => el !== '')

        let pkFareToFilter = []
        let pkFareParse = ''

        for (let i = 0; i < temp1.length / 10; i++) {
            pkFareToFilter[i] = temp1.slice(i * 10, i * 10 + 10)
        }

        // console.log(pkFareToFilter)
        for (let i = 0; i < pkFareToFilter.length; i++) {
            const element = pkFareToFilter[i]
            const date = new Date(element[5]).toString().toUpperCase().split(' ')
            pkFareParse += `${element[0]} ${date[2]}${date[1]}${date[3].slice(-2)} ${element[1]
                }${element[2]}  ${element[6].replace(':', '')} ${element[8].replace(
                    ':',
                    ''
                )}\n`
            // console.log(date);
        }
        // console.log(pkFareParse)
        return pkFareParse
    },
    dida: (value: string): string => {
        const temp = value.trim().split('\n')
        const flights = temp.map((e) => e.split(' '))
        // console.log(flights)
        const result = flights.map((el) => {
            return `${el[0]} ${new Date(el[3]).toString().toUpperCase().split(' ')[2]
                }${new Date(el[3]).toString().toUpperCase().split(' ')[1]}${new Date(
                    el[3]
                )
                    .toString()
                    .toUpperCase()
                    .split(' ')[3]
                    .slice(-2)} ${el[2].replace('-', '')} ${el[4].replace(
                        ':',
                        ''
                    )} ${el[6].replace(':', '')} ${new Date(el[5]).toString().toUpperCase().split(' ')[2]
                }${new Date(el[5]).toString().toUpperCase().split(' ')[1]}${new Date(
                    el[5]
                )
                    .toString()
                    .toUpperCase()
                    .split(' ')[3]
                    .slice(-2)}`
        })
        // console.log(result.toString());
        return result.join('\n')
    },
    aerapi: (value: string): string => {
        const temp = value.split('\n')
        const flights = temp.map((e) => e.trim().split(' '))
        // console.log(flights)

        const result = flights.map((el) => {
            const date = `${new Date(el[3]).toString().toUpperCase().split(' ')[2]}${new Date(el[3]).toString().toUpperCase().split(' ')[1]
                }${new Date(el[3]).toString().toUpperCase().split(' ')[3].slice(-2)}`
            return `${el[0]}${el[1]} ${date} ${el[4]} ${el[6].replace(
                ':',
                ''
            )} ${el[7].replace(':', '')}`
        })
        // console.log(result.join('\n'))
        return result.join('\n')
    },
    chartershop: (value: string): string => {
        const charterShopInitial = value
            .trim()
            .replace(/\t/g, '\n')
            .split('\n')
            .filter((e) => e !== '')

        // console.log(value.split(' '))
        // console.log(charterShopInitial)

        const dateFormatter = (date: string): string => {
            const [day, month, year] = date.split('.')
            const outputDate = new Date(`${year}-${month}-${day}`)
                .toDateString()
                .toUpperCase()
                .split(' ')
                .slice(-3)
            // console.log(outputDate)
            // console.log(day, month, year)
            return `${outputDate[1]}${outputDate[0]}${outputDate[2].slice(-2)}`
        }

        // dateFormatter('01.08.2024')

        return `${charterShopInitial[0]} ${dateFormatter(charterShopInitial[4])} ${charterShopInitial[1]
            }${charterShopInitial[5]} ${charterShopInitial[3].replace(
                ':',
                ''
            )} ${charterShopInitial[7].replace(':', '')} ${dateFormatter(
                charterShopInitial[8]
            )}\n`
    },
    justgotrip: (value: string): string => {
        let result = ``
        try {
            const parsed = value
                .trim()
                .split(/\n|\t|' '/g)
                .filter((e) => e !== '' && e !== '-')
                .map((e) => e.trim())
            const parsed1 = value.trim().split(/\n|\t|' '/g).filter((e) => e !== '' && e !== '-').map(e => e.trim())
            console.log(parsed)
            console.log(parsed1)
            const dateTimeDep = new Date(parsed[2])
                .toString()
                .toUpperCase()
                .split(' ')
            const dateTimeArr = new Date(parsed[3])
                .toString()
                .toUpperCase()
                .split(' ')
            const airports = parsed[1].replace(/[\s-]/g, '')
            console.log(dateTimeDep);
            console.log(dateTimeArr);
            console.log(airports);
            result = `${parsed[0]} ${dateTimeDep[2]}${dateTimeDep[1]
                }${dateTimeDep[3].slice(-2)} ${airports} ${dateTimeDep[4]
                    .slice(0, 5)
                    .replace(':', '')} ${dateTimeArr[4].slice(0, 5).replace(':', '')} ${dateTimeArr[2]
                }${dateTimeArr[1]}${dateTimeArr[3].slice(-2)}`
            console.log(result);
        } catch (error) {
            return 'Некоректний вибір опції або неповний/некоректний рядок\n'
        }
        return result
    },
    ticketbunker: (value: string): string => {
        let output = ''
        try {
            if (value) {
                // console.log(
                // 	value
                // 		.trim()
                // 		.split(/-|\s+|\|\s*|→/g)
                // 		.filter((e) => e !== '')
                // )
                const parsed = value
                    .trim()
                    .split(/-|\s+|\|\s*|→/g)
                    .filter((e) => e !== '')

                output = `${parsed[0]} ${parsed[1]
                    }${parsed[2].toUpperCase()}${parsed[3].slice(-2)} ${parsed[7]}${parsed[8]
                    } ${parsed[5].replace(':', '')} ${parsed[6].replace(':', '')}`
            }
        } catch (error) {
            return 'Некоректний вибір опції або неповний/некоректний рядок\n'
        }

        return output
    },
}
